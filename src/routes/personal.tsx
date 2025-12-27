import { Link } from "react-router-dom";

const postFiles = import.meta.glob('../posts/personal/*/index.md', { eager: false });

export default function Personal() {
  const posts = Object.keys(postFiles).map(path => {
    // Extract directory name: '../posts/personal/2022-resolution-review/index.md' -> '2022-resolution-review'
    const pathParts = path.split('/');
    const dirName = pathParts[pathParts.length - 2] || '';
    const title = dirName.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return { id: dirName, title };
  });

  return (
    <article>
      <h2>Personal</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/personal/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
