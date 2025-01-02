from ws_make_dynamic import app
from flask_frozen import Freezer

freezer = Freezer(app)

app.config["FREEZER_RELATIVE_URLS"] = True

if __name__ == "__main__":
    freezer.run(debug=True)