import { Link } from "react-router-dom";
import { PenSquare } from "lucide-react";

const WriteIcon = () => (
  <Link to="/publish">
    <PenSquare className="w-5 h-5 text-gray-700 hover:text-black cursor-pointer" />
  </Link>
);

export default WriteIcon;
