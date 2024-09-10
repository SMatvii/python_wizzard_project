from flask import render_template
from .. import app

standart_error_codes = [502, 404, 403, 500, 401, ]


def error_handling(error):
    return render_template('error.html', code=error.code)

for error in standart_error_codes:
    app.register_error_handler(error, error_handling)