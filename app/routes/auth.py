from flask import flash, render_template, redirect, url_for, request, session
from .. import login_manager
from ..db import User, Session
from sqlalchemy import select
from ..forms import RegisterForm, LoginForm
from .. import app
from flask_login import login_user

@login_manager.user_loader
def load_user(user_id):
    with Session.begin() as session:
        user = session.scalar(select(User).where(User.id == user_id))
        if user:
            return user

@app.get('/success')
def success():
    return render_template('success.html')

@app.get('/base')
def base():
    return render_template('base.html')

@app.get('/index')
def index():
    return render_template('index.html')

@app.get('/home')
def home():
    return render_template('home.html')

@app.get('/nav')
def nav():
    return render_template('nav.html')

@app.get('/paymant')
def paymant():
    return render_template('payment.html')

@app.get('/products')
def products():
    return render_template('products.html')

@app.get('/card_pay')
def card_pay():
    return render_template('card_pay.html')

@app.get('/pay')
def pay():
    cart = session.get('cart', [])
    total_amount = sum(item['price'] * item['quantity'] for item in cart)
    return render_template('pay.html', total_amount=total_amount)

@app.post('/process_payment')
def process_payment():
    if all(key in request.form for key in ('name', 'card_number', 'expiry_data', 'cvc')):
        session.pop('cart', None)
        return redirect(url_for('payment_success'))
    else:
        flash('Будь ласка, заповніть всі поля!', 'danger')
        return redirect(url_for('pay'))

@app.post('/complete_payment')
def complete_payment():
    payment_method = request.form.get('payment_method')
    if payment_method == 'card':
        card_type = request.form.get('card_type')
        card_number = request.form.get('card_number')
        expiry_date = request.form.get('expiry_date')
        cvc = request.form.get('cvc')

    session.pop('cart', None)
    return render_template('card_pay.html', success_message='Оплата успішно пройдена!')

@app.get('/cart')
def cart():
    cart_items = session.get('cart', [])
    return render_template('cart.html', cart_items=cart_items)

@app.post('/add_to_cart')
def add_to_cart():
    product_name = request.form['product_name']
    product_weight = request.form['product_weight']
    product_price = float(request.form['product_price'])
    quantity = int(request.form['quantity'])
    product_image = request.form.get('product_image', '')

    cart = session.get('cart', [])
    found = False

    for item in cart:
        if item['name'] == product_name:
            item['quantity'] += quantity
            found = True
            break

    if not found:
        cart.append({
            'name': product_name,
            'weight': product_weight,
            'price': product_price,
            'quantity': quantity,
            'image_url': product_image
        })

    session['cart'] = cart
    return redirect(url_for('cart'))

@app.post('/update_quantity')
def update_quantity():
    cart = session.get('cart', [])
    for item in cart:
        quantity_key = f'quantity_{item["name"]}'
        if quantity_key in request.form:
            quantity = int(request.form[quantity_key])
            item['quantity'] = quantity

    session['cart'] = cart
    return redirect(url_for('cart'))

@app.post('/remove_from_cart')
def remove_from_cart():
    product_name = request.form.get('product_name')
    cart = session.get('cart', [])

    updated_cart = [item for item in cart if item['name'] != product_name]
    session['cart'] = updated_cart

    return redirect(url_for('cart'))

@app.post('/clear_cart')
def clear_cart():
    session.pop('cart', None)
    return redirect(url_for('cart'))

@app.get('/register')
def register():
    form = RegisterForm()
    return render_template('form_template.html', form=form)

@app.post('/register')
def register_post():
    form = RegisterForm()
    if form.validate_on_submit():
        with Session.begin() as session:
            user = session.scalar(select(User).where(User.email == form.email.data))
            if user:
                flash("User with this email already exists!")
                return redirect(url_for('register'))
            user = User(
                nickname=form.nickname.data,
                email=form.email.data,
                password=form.password.data,
            )
            session.add(user)
            session.commit()
        return redirect(url_for('login'))
    return render_template('form_template.html', form=form)

@app.get('/login')
def login():
    form = LoginForm()
    return render_template('form_template.html', form=form)

@app.post('/login')
def login_post():
    form = LoginForm()
    if form.validate_on_submit():
        with Session.begin() as session:
            user = session.query(User).filter_by(email=form.email.data).first()
            if user and user.nickname == form.nickname.data and user.password == form.password.data:
                login_user(user)
                return redirect(url_for('success'))
            flash("Invalid credentials")
    return render_template('form_template.html', form=form)