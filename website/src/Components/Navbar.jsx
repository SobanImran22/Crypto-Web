import { Link } from "react-router-dom";


const Navbar = () => {
  return (
        
    <nav className="navbar">
      <div className="logo"><b>USA-Traders</b></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/plans">Plans</Link>
        <Link to="/withdraw">Withdraw</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/deposit">Deposit</Link>
        <br />

      </div>
    </nav>
  );
};

export default Navbar;
