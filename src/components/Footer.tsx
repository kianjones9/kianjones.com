export default function Footer() {
  return (
    <footer>
      <nav className="webring" aria-label="Letta webring">
        <span className="webring-label">part of the</span>
        <a href="https://github.com/4shub/ringdt">Letta webring</a>
        <span className="webring-links">
          <a href="https://ringdt.rapid.workers.dev/lettamates/prev?from=https://kianjon.es">← previous</a>
          <span> · </span>
          <a href="https://ringdt.rapid.workers.dev/lettamates/next?from=https://kianjon.es">next →</a>
        </span>
      </nav>
      <nav className="social-links" aria-label="Social links">
        <a href="https://bsky.app/profile/kianjon.es" target="_blank" rel="noopener noreferrer">
          Bluesky
        </a>
        <span> · </span>
        <a href="https://x.com/kian_jones_" target="_blank" rel="noopener noreferrer">
          Twitter/X
        </a>
        <span> · </span>
        <a href="https://www.linkedin.com/in/kian-jones/" target="_blank" rel="noopener noreferrer">
          Linkedin
        </a>
      </nav>
    </footer>
  );
}
