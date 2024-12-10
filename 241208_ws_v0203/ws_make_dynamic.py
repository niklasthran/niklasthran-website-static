from flask import Flask, render_template
import json
import os
data_location = "./static"

# Load JSON
json_data = json.load(open(f"{data_location}/project_data.json"))

# Generate image and video URLs
for key in json_data.keys():
    videos = []
    images = []
    for file in os.listdir(f"{data_location}/{key}"):
        if ".mp4" in file or ".mov" in file:
            videos.append(f"{data_location}/{key}/{file}")
        if ".jpg" in file or ".png" in file:
            images.append(f"{data_location}/{key}/{file}")
        
    json_data[key]["videos"] = videos
    json_data[key]["images"] = images

# Sort -> date
json_data = dict(sorted(json_data.items(), key = lambda x: x[1]["date"], reverse=True))

for file in os.listdir(f"{data_location}/projects"):
    print(file)

# List all photos in photo_archive directory
photo_data = []
for file in os.listdir(f"{data_location}/photo_archive"):
    if ".jpg" in file or ".png" in file:
        photo_data.append(f"{data_location}/photo_archive/{file}")
        
photo_data.sort(reverse=True)

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", json_data=json_data, photo_data=photo_data)

@app.route("/<key>.html")
def project(key):

    project_data = None

    if key in json_data:
        project_data = json_data[key]

    return render_template("project.html", project_data=project_data)

@app.route("/photo_archive.html")
def photo_archive():
    return render_template("photo_archive.html", photo_data=photo_data)

@app.route("/contact.html")
def contact():
    return render_template("contact.html")

@app.route("/imprint.html")
def imprint():
    return render_template("imprint.html")

if __name__ == "__main__":
    app.run(debug = True)