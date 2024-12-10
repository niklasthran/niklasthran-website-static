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

print(all_projects['pi']['images'])