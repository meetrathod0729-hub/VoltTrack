from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields
from models import Tool, Resource, Order
class ToolSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Tool
        load_instance = True
class ResourceSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Resource
        load_instance = True
class OrderSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        load_instance = True
    required_tools_list = fields.Method("get_list")
    def get_list(self, obj):
        return obj.required_tools.split(",") if obj.required_tools else []