const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function generatePostsList() {
    const postsDir = path.join(__dirname, 'posts');
    const postDirs = fs.readdirSync(postsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    
    const posts = [];
    
    for (const postDir of postDirs) {
        const postPath = path.join(postsDir, postDir);
        const yamlPath = path.join(postPath, 'post.yaml');
        
        if (fs.existsSync(yamlPath)) {
            try {
                const yamlContent = fs.readFileSync(yamlPath, 'utf8');
                const metadata = yaml.load(yamlContent);
                
                if (metadata.processed && metadata.title && metadata.filename) {
                    posts.push({
                        title: metadata.title,
                        date: metadata.date,
                        path: `posts/${encodeURIComponent(postDir)}/${metadata.filename}`,
                        tags: metadata.tags || []
                    });
                }
            } catch (error) {
                console.warn(`Error reading ${yamlPath}:`, error.message);
            }
        }
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return posts;
}

function generatePostsHTML(posts) {
    return posts.map(post => 
        `            <div class="post">
              <a href="${post.path}">${post.title}</a>
            </div>`
    ).join('\n');
}

function updatePostsHTML() {
    const posts = generatePostsList();
    const postsHTML = generatePostsHTML(posts);
    
    const htmlPath = path.join(__dirname, 'posts.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Replace the hardcoded post list with the generated one
    const startMarker = '<div id="post-list">';
    const endMarker = '</div>';
    const startIndex = htmlContent.indexOf(startMarker);
    const endIndex = htmlContent.indexOf(endMarker, startIndex) + endMarker.length;
    
    if (startIndex !== -1 && endIndex !== -1) {
        const newContent = `<div id="post-list">
${postsHTML}
          </div>`;
        
        htmlContent = htmlContent.substring(0, startIndex) + newContent + htmlContent.substring(endIndex);
        fs.writeFileSync(htmlPath, htmlContent, 'utf8');
        console.log('posts.html updated successfully');
    } else {
        console.error('Could not find post-list div in posts.html');
    }
}

if (require.main === module) {
    updatePostsHTML();
}

module.exports = { generatePostsList, generatePostsHTML, updatePostsHTML };