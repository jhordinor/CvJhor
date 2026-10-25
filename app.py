"""Portafolio profesional público de Javier Jhordiño Ramírez Caitimari."""
import os
from flask import Flask, jsonify, render_template

app = Flask(__name__, template_folder="templates", static_folder="static")


@app.get("/")
def inicio():
    return render_template("index.html")


@app.get("/health")
def health():
    return jsonify(status="ok")


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=int(os.environ.get("PORT", "5000")),
        debug=os.environ.get("FLASK_DEBUG", "0") == "1",
    )
