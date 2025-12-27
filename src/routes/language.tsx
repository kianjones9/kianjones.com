import { Link } from "react-router-dom";

const postFiles = import.meta.glob('../posts/language/*/index.md', { eager: false });

export default function Language() {
  const posts = Object.keys(postFiles).map(path => {
    // Extract directory name: '../posts/language/arabic-update/index.md' -> 'arabic-update'
    const pathParts = path.split('/');
    const dirName = pathParts[pathParts.length - 2] || '';
    const title = dirName.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return { id: dirName, title };
  });

  return (
    <article>
      <h2>Language</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/language/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
