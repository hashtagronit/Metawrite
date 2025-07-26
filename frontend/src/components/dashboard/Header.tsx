import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center bg-[#f9f5f1] justify-between px-6 py-4 border-b border-gray-800">
      <Link to="/" className="text-2xl font-heading font-bold">
        MetaWrite
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link to="#" className="hover:underline">Our story</Link>
        <Link to="#" className="hover:underline">Membership</Link>
        <Link to="#" className="hover:underline">Write</Link>
        <Link to="/signin" className="hover:underline">Sign in</Link>
        <button
          className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:opacity-90"
          onClick={() => navigate("/signup")}
        >
          Get started
        </button>
      </nav>
    </header>
  );
}

export default Header;
