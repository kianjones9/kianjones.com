// Static configuration of posts for GitHub Pages
// This file should be updated whenever you add new posts

const POSTS_CONFIG = [
    {
        id: '2021-language-learning-review',
        title: '2021 Language Learning Review',
        folder: '2021 Language Learning Review',
        filename: '2021-language-learning-review.html',
        date: '2021-01-10',
        icon: '🗣️'
    },
    {
        id: '2022-resolutions-part-1-end-of-year-review', 
        title: '2022 Resolutions Part 1 End of Year Review',
        folder: '2022 Resolutions Part 1 End of Year Review',
        filename: '2021-year-end-review.html',
        date: '2021-01-03',
        icon: '📅'
    }
];

// Function to load post content dynamically
async function loadPostContent(postConfig) {
    try {
        const postUrl = `posts/${encodeURIComponent(postConfig.folder)}/${postConfig.filename}`;
        const response = await fetch(postUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const html = await response.text();
        
        // Extract content div
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const contentDiv = doc.querySelector('.content');
        
        if (contentDiv) {
            let content = contentDiv.innerHTML;
            // Fix image paths
            const postDir = `posts/${encodeURIComponent(postConfig.folder)}/`;
            content = content.replace(/src="(?!http|\/)/g, `src="${postDir}`);
            return content;
        }
        
        return `<h1>${postConfig.title}</h1><p>Content could not be loaded. <a href="${postUrl}" target="_blank">View original post →</a></p>`;
        
    } catch (error) {
        console.error('Failed to load post:', error);
        return `<h1>${postConfig.title}</h1><p>Error loading post content. <a href="posts/${encodeURIComponent(postConfig.folder)}/${postConfig.filename}" target="_blank">View original post →</a></p>`;
    }
}