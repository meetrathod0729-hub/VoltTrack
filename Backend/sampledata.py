from app import db, Tool, Resource, Order, app
with app.app_context():
    db.drop_all(); db.create_all()
    db.session.add_all([
        Tool(name="Wire Cutter", type="Hand Tool", quantity=5),
        Tool(name="Multimeter", type="Measuring Tool", quantity=2),
        Resource(name="Copper Wire", quantity=20),
        Order(client_name="Orient Electricals", address="23, Main Street", required_tools="1,2")
    ])
    db.session.commit()
    print("✅ Demo data inserted")