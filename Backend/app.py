from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Tool, Resource, Order
from schemas import ToolSchema, ResourceSchema, OrderSchema
from datetime import datetime
import os

BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, "database.db")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # ✅ Corrected line

with app.app_context():
    db.create_all()

tool_schema, tools_schema = ToolSchema(), ToolSchema(many=True)
res_schema, ress_schema = ResourceSchema(), ResourceSchema(many=True)
order_schema, orders_schema = OrderSchema(), OrderSchema(many=True)

# ---------- TOOLS ----------
@app.route("/api/tools", methods=["GET"])
def all_tools():
    return jsonify(tools_schema.dump(Tool.query.all()))

@app.route("/api/tools", methods=["POST"])
def add_tool():
    d = request.json
    t = Tool(
        name=d["name"],
        type=d["type"],
        quantity=d.get("quantity", 0),
        notes=d.get("notes", "")
    )
    db.session.add(t)
    db.session.commit()
    return tool_schema.jsonify(t)

@app.route("/api/tools/<int:id>", methods=["PUT"])
def edit_tool(id):
    t = Tool.query.get_or_404(id)
    d = request.json
    for f in ["name", "type", "quantity", "notes"]:
        setattr(t, f, d.get(f, getattr(t, f)))
    db.session.commit()
    return tool_schema.jsonify(t)

@app.route("/api/tools/<int:id>", methods=["DELETE"])
def del_tool(id):
    t = Tool.query.get_or_404(id)
    db.session.delete(t)
    db.session.commit()
    return jsonify({"msg": "deleted"})


# ---------- RESOURCES ----------
@app.route("/api/resources", methods=["GET"])
def all_res():
    return jsonify(ress_schema.dump(Resource.query.all()))

@app.route("/api/resources", methods=["POST"])
def add_res():
    d = request.json
    r = Resource(
        name=d["name"],
        quantity=d.get("quantity", 0),
        notes=d.get("notes", "")
    )
    db.session.add(r)
    db.session.commit()
    return res_schema.jsonify(r)

@app.route("/api/resources/<int:id>", methods=["PUT"])
def edit_res(id):
    r = Resource.query.get_or_404(id)
    d = request.json
    for f in ["name", "quantity", "status", "notes"]:
        setattr(r, f, d.get(f, getattr(r, f)))
    db.session.commit()
    return res_schema.jsonify(r)

@app.route("/api/resources/<int:id>", methods=["DELETE"])
def del_res(id):
    r = Resource.query.get_or_404(id)
    db.session.delete(r)
    db.session.commit()
    return jsonify({"msg": "deleted"})


# ---------- ORDERS ----------
@app.route("/api/orders", methods=["GET"])
def all_orders():
    return jsonify(orders_schema.dump(Order.query.all()))

@app.route("/api/orders", methods=["POST"])
def add_order():
    d = request.json
    o = Order(
        client_name=d["client_name"],
        address=d.get("address", ""),
        date_created=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        deadline=d.get("deadline"),
        required_tools=",".join(map(str, d.get("required_tools", []))),
        notes=d.get("notes", "")
    )
    db.session.add(o)
    db.session.commit()
    return order_schema.jsonify(o)

@app.route("/api/orders/<int:id>", methods=["PUT"])
def edit_order(id):
    o = Order.query.get_or_404(id)
    d = request.json
    for f in ["client_name", "address", "deadline", "status", "notes"]:
        setattr(o, f, d.get(f, getattr(o, f)))
    db.session.commit()
    return order_schema.jsonify(o)


if __name__ == "__main__":
    print("Backend running → http://localhost:5000")
    app.run(port=5000, debug=True)
