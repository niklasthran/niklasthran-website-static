import os
import minify_html

all_files = os.listdir(f"./build/")
for element in all_files:
    if ".html" not in element:
        all_files.remove(element)

for element in all_files:
    file = open(f"./build/{element}", "r+")
    html_str = file.read()
    html_str_mini = minify_html.minify(html_str)
    html_str_mini
    file.seek(0)
    file.truncate()
    file.write(html_str_mini)
    file.close()