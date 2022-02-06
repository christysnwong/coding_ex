# Put your app in here.
from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

oper = {
    "add": add,
    "sub": sub,
    "mult": mult,
    "div": div
}

@app.route('/math/<operation>')
def math_op(operation):
    """ Do math operation on a & b """
    a = int(request.args["a"])
    b = int(request.args["b"])

    return str(oper[operation](a, b))



@app.route('/add')
def adding():
    """ Add a & b """
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(add(a, b))

@app.route('/sub')
def subtracting():
    """ Subtract b from a """
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(sub(a, b))

@app.route('/mult')
def multiplying():
    """ Multiply a & b """
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(mult(a, b))

@app.route('/div')
def dividing():
    """ Divide a by b """
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(div(a, b))

