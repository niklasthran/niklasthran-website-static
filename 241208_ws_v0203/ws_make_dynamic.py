from flask import Flask, render_template
import json
import os
data_location = "./static"

all_projects = {}

for project in os.listdir(f"{data_location}/projects"):
    if ".DS_Store" not in project:
        project_data = {}
        videos = []
        images = []

        for file in os.listdir(f"{data_location}/projects/{project}"):
            if ".json" in file:
                project_data = json.load(open(f"{data_location}/projects/{project}/{file}"))
            if ".mp4" in file or ".mov" in file:
                videos.append(f"{data_location}/projects/{project}/{file}")
            if ".jpg" in file or ".png" in file:
                images.append(f"{data_location}/projects/{project}/{file}")
        
        project_data[project]["videos"] = videos
        project_data[project]["images"] = images
        
        all_projects.update(project_data)

# Sort -> date
all_projects = dict(sorted(all_projects.items(), key = lambda x: x[1]["date"], reverse=True))

print(all_projects['pi'])

# List all photos in photo_archive directory
photo_data = []
for file in os.listdir(f"{data_location}/photo_archive"):
    if ".jpg" in file or ".png" in file:
        photo_data.append(f"{data_location}/photo_archive/{file}")
        
photo_data.sort(reverse=True)

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", all_projects=all_projects, photo_data=photo_data)

@app.route("/<key>.html")
def project(key):

    project_data = None

    if key in all_projects:
        project_data = all_projects[key]

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