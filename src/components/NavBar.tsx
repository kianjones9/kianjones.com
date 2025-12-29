import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <ul className='navbar'>
        <li><Link className="navbar_link" to="/">Home</Link></li>
        <li><Link className="navbar_link" to="/engineering">Engineering</Link></li>
        <li><Link className="navbar_link" to="/personal">Personal</Link></li>
        <li><Link className="navbar_link" to="/about">About</Link></li>
      </ul>
    </nav>
  );
}
