from flask import Flask, render_template
import json
import os
data_location = "./static"

# load project data from file
json_data = json.load(open(f"{data_location}/project_data.json"))
# sort data by date key, latest first
json_data = dict(sorted(json_data.items(), key = lambda x: x[1]["date"], reverse=True))

# generate images and video urls
all_files = []
for key in json_data.keys():
    videos = []
    images = []
    all_files = os.listdir(f"{data_location}/{key}")
    #all_files.remove(".DS_Store")
    for file in all_files:
        if ".mp4" in file or ".mov" in file:
            videos.append(f"{data_location}/{key}/{file}")
        if ".jpg" in file or ".png" in file:
            images.append(f"{data_location}/{key}/{file}")
        
    json_data[key]["videos"] = videos
    json_data[key]["images"] = images

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", json_data=json_data)

@app.route("/<key>.html")
def new_project(key):

    key_data = None

    if key in json_data:
        key_data = json_data[key]

    return render_template("new_project.html", key_data=key_data)

@app.route("/contact.html")
def contact():
    return render_template("contact.html", json_data=json_data)

if __name__ == "__main__":
    app.run(debug = True)