import os
import yaml

file = open("base-post.html","r")
base = file.read()
file.close()

def get_content(filename):

    f = open(filename, "r")
    text = f.read()
    f.close()
    
    open_tag = "<article>"
    start_index = text.find(open_tag)
    close_tag = "</article>"
    end_index = text.find(close_tag)

    content =  text[start_index:end_index + len(close_tag)]
    return content

for post_dir in os.listdir("posts/"):
    
    f = open(post_dir + "post.yaml")
    metadata = yaml.load(f)
    f.close()

    if metadata.processed == True:
        continue

    content = get_content(metadata.filename)
    
    tag = "<div class=\"content\">"
    index = base.find(tag)
    post = base[:index + len(tag)] + content + base[len(tag) + index:]


    file = open("posts/" + metadata.filename,"w")
    file.write(post)
    file.close()