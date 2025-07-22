const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Read all post directories and generate data for the index.html
function generatePostsData() {
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
                    const htmlPath = path.join(postPath, metadata.filename);
                    let htmlContent = '';
                    
                    if (fs.existsSync(htmlPath)) {
                        const fullHtml = fs.readFileSync(htmlPath, 'utf8');
                        // Extract content div
                        const contentMatch = fullHtml.match(/<div class="content">([\s\S]*?)<\/div>\s*<script/);
                        if (contentMatch) {
                            htmlContent = contentMatch[1];
                            // Fix relative image paths
                            htmlContent = htmlContent.replace(/src="(?!http|\/)/g, `src="posts/${encodeURIComponent(postDir)}/`);
                        }
                    }
                    
                    posts.push({
                        id: postDir.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                        title: metadata.title,
                        date: metadata.date,
                        folderName: postDir,
                        filename: metadata.filename,
                        htmlContent: htmlContent,
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

// Generate JavaScript code to inject into index.html
function generateJavaScriptCode() {
    const posts = generatePostsData();
    
    // Generate sidebar HTML
    const sidebarItems = posts.map(post => 
        `                                        <div class="file" onclick="loadFile('${post.id}')">
                                            <span class="file-icon">📄</span>
                                            <span class="file-name">${post.title}</span>
                                        </div>`
    ).join('\n');
    
    // Generate file content object
    const fileContentEntries = posts.map(post => 
        `                '${post.id}': \`${post.htmlContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\``
    ).join(',\n');
    
    // Generate icons and names mappings
    const iconsEntries = posts.map(post => 
        `                    '${post.id}': '📄'`
    ).join(',\n');
    
    const namesEntries = posts.map(post => 
        `                    '${post.id}': '${post.title}'`
    ).join(',\n');
    
    // Generate terminal file system
    const terminalFiles = posts.map(post => 
        `                            '${post.title}': { type: 'file', content: '${post.id}' }`
    ).join(',\n');
    
    return {
        sidebarItems,
        fileContentEntries,
        iconsEntries,
        namesEntries,
        terminalFiles,
        posts
    };
}

if (require.main === module) {
    const data = generateJavaScriptCode();
    console.log('Generated data for', data.posts.length, 'posts');
    console.log('Posts:', data.posts.map(p => p.title).join(', '));
}

module.exports = { generatePostsData, generateJavaScriptCode };