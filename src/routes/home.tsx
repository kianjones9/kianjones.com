import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>Thank you for visiting my corner of the internet!</p>

      <h3><Link to="/engineering">Engineering</Link></h3>
      <p>covers some of the projects I've worked on, and technical write ups.</p>
      
      <h3><Link to="/personal">Personal</Link></h3>
      <p> includes blog posts about my personal life and after-hours pursuits like language learning, sewing, etc.</p>

    </div>
  );
}
