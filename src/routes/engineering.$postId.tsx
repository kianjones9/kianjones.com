import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const postFiles = import.meta.glob('../posts/engineering/*/index.md', { 
  query: '?raw',
  import: 'default',
  eager: false
});

// Also import all images from post directories
const imageFiles = import.meta.glob('../posts/engineering/**/*.{png,jpg,jpeg,gif,svg,webp}', {
  eager: true,
  import: 'default'
});

export default function EngineeringPost() {
  const { postId } = useParams<{ postId: string }>();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!postId) return;
      
      const postPath = `../posts/engineering/${postId}/index.md`;
      const loader = postFiles[postPath];
      
      if (loader) {
        try {
          const markdown = await loader() as string;
          setContent(markdown);
        } catch (error) {
          console.error('Error loading post:', error);
          setContent('Error loading post');
        }
      } else {
        setContent('Post not found');
      }
      setLoading(false);
    };

    loadPost();
  }, [postId]);

  if (loading) return <div>Loading...</div>;

  return (
    <article>
      <Link to="/engineering">← Back to Engineering</Link>
      <div className="post-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({node, ...props}) => {
              // Transform relative image paths to imported assets
              let src = props.src;
              if (src?.startsWith('./')) {
                // Decode URL-encoded characters like %20
                const decodedSrc = decodeURIComponent(src.slice(2));
                const imagePath = `../posts/engineering/${postId}/${decodedSrc}`;
                src = imageFiles[imagePath] as string || props.src;
              }
              return <img {...props} src={src} alt={props.alt || ''} />;
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
