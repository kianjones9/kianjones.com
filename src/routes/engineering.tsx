import { Link } from "react-router-dom";

// Use Vite's import.meta.glob to automatically discover posts
const postFiles = import.meta.glob('../posts/engineering/*/index.md', { eager: false });

export default function Engineering() {
  // Extract post IDs from directory paths
  const posts = Object.keys(postFiles).map(path => {
    // Extract directory name: '../posts/engineering/ai-sre/index.md' -> 'ai-sre'
    const pathParts = path.split('/');
    const dirName = pathParts[pathParts.length - 2] || '';
    // Convert kebab-case to Title Case for display
    const title = dirName.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return { id: dirName, title };
  });

  return (
    <article>
      <h2>Engineering</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/engineering/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
