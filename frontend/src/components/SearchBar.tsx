import { Search } from "lucide-react";

const SearchBar = () => (
  <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-2 w-1/3 border-1 border-gray-400">
    <Search className="w-4 h-4 text-gray-500 mr-2 " />
    <input
      type="text"
      placeholder="Search"
      className="bg-transparent outline-none w-full text-sm text-gray-700"
    />
  </div>
);

export default SearchBar;
