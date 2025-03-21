"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Expenses
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.services.categorizer import categorize_expense
import json
from datetime import datetime, timedelta

from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

import os

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
bcrypt = Bcrypt()


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "El correo electrónico ya está en uso"}), 400
    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password,
        is_active=True
    )
  
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201


@api.route('/categorize_expenses', methods=['POST'])
#@jwt_required
def categorize_expenses():
    data = request.get_json()
    #id = get_jwt_identity()
    user_id = data.get('user_id')
    price= data.get('price')
    description = data.get('description')

    if not user_id or not description or not price:
        return jsonify({"error": "user_id, price and description are required"}), 400
    
    category_str = categorize_expense(description)
    resp_dict = json.loads(category_str)

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    new_expense = Expenses(
        amount=price,
        description=description,
        category=resp_dict['category'].lower(),
        subcategory=resp_dict['subcategory'].lower(),
        user_id=user.id,
        date=datetime.utcnow()  # Agrega la fecha actual
    )

    db.session.add(new_expense)
    db.session.commit()

    return jsonify({"msg": "ok", "expense": new_expense.serialize()}), 200


@api.route('/expenses/<search>', methods=['GET'])
def get_expenses_by_category(search):
    if not search:
        return jsonify({"error": "Search item is required"}), 400

    expenses_by_category = Expenses.query.filter_by(category=search.lower()).all()
    expenses_by_subcategory = Expenses.query.filter_by(subcategory=search.lower()).all()
    
    if not expenses_by_category and not expenses_by_subcategory:
        return jsonify({"error": "No expenses found"}), 404

    expenses = expenses_by_category + expenses_by_subcategory
    return jsonify([expense.serialize() for expense in expenses]), 200


@api.route('/expenses/<int:user_id>', methods=['GET'])
def get_user_expenses(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    expenses = Expenses.query.filter_by(user_id=user_id).all()
    if not expenses:
        return jsonify({"error": "No expenses found for this user"}), 404

    return jsonify([expense.serialize() for expense in expenses]), 200


@api.route('/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    expense = Expenses.query.get(expense_id)
    if not expense:
        return jsonify({"error": "Expense not found"}), 404

    db.session.delete(expense)
    db.session.commit()

    return jsonify({"msg": "Expense deleted"}), 200

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"message": "Inicio de sesión exitoso", "access_token": access_token, "user": user.serialize()}), 200
    else:
        return jsonify({"message": "Email de usuario o contraseña incorrectos"}), 401
    
    # ------------- delete user -------------
    
@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "User deleted"}), 200

