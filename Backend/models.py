from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
class Tool(db.Model):
    __tablename__ = "tools"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, default=0)
    notes = db.Column(db.Text)
class Resource(db.Model):
    __tablename__ = "resources"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    quantity = db.Column(db.Integer, default=0)
    status = db.Column(db.String(50), default="pending")
    notes = db.Column(db.Text)
class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True)
    client_name = db.Column(db.String(200))
    address = db.Column(db.String(400))
    date_created = db.Column(db.String(50))
    deadline = db.Column(db.String(50))
    required_tools = db.Column(db.String(400))
    status = db.Column(db.String(50), default="pending")
    notes = db.Column(db.Text)