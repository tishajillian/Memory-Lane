import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../images/logo.svg"
import plus from "../images/plus-logo.svg"

const Navbar = ({ onPressed, setOnPressed }) => {

    const [navbarOpen, setNavbarOpen] = useState(false);

    const navlinks = [
        { title: "Profile", path: "/profile" },
        { title: "Home", path: "/" },
        { title: "My Journals", path: "/myjournals" },
    ];

    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen);
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" className="logolink">
                    <img src={logo} alt="memory-lane-logo" width={150} height={100} />
                </Link>
            </div>
            <div className="navbar-links">
                <ul className="links">
                    {navlinks.map((link, index) => (
                        <li
                            key={index}
                            onClick={() => setOnPressed(link.path)}
                            className={onPressed === link.path ? 'active' : ''}
                        >
                            <Link to={link.path} className="navlink">
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="new-journal-entry">
                <Link to="/newentry" className="new-journal-link" onClick={() => setOnPressed('')}>
                    <div className="new-journal-button">
                        <img src={plus} alt="new-entry-sign" width={30} height={30} />
                        <a>New Entry</a>
                    </div>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
