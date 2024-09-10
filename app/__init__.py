from flask import Flask
from flask_login import LoginManager # type: ignore


app = Flask(__name__)
app.config['SECRET_KEY'] = "5c127f7b931424c1cd0d9cf030aa4c70"
login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)


from . import routes