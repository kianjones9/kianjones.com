import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Load meta.json files
const metaFiles = import.meta.glob('../posts/engineering/*/meta.json');

interface PostMeta {
  title: string;
  date: string;
  description?: string;
}

interface Post {
  id: string;
  title: string;
  date: string;
  description?: string;
}

export default function Engineering() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const postData: Post[] = [];
      
      for (const [path, loader] of Object.entries(metaFiles)) {
        // Extract directory name from path
        const pathParts = path.split('/');
        const dirName = pathParts[pathParts.length - 2] || '';
        
        try {
          const meta = await loader() as { default: PostMeta };
          postData.push({
            id: dirName,
            title: meta.default.title,
            date: meta.default.date,
            description: meta.default.description
          });
        } catch (error) {
          console.error(`Error loading meta for ${dirName}:`, error);
        }
      }
      
      // Sort by date (newest first)
      postData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(postData);
    };

    loadPosts();
  }, []);

  return (
    <article>
      <h2>Engineering</h2>
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <Link to={`/engineering/${post.id}`}>{post.title}</Link>
            <div className="post-meta">
              <span className="post-date">{post.date}</span>
              {post.description && (
                <span className="post-description"> · {post.description}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
