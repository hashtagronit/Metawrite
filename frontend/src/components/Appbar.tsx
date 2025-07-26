
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import WriteIcon from "./WriteIcon";
import Avatar from "./Avatar";

function Appbar() {
  return (
    <div className="border-b flex justify-between items-center px-10 py-4 bg-[#f9f5f1] shadow-sm">
      <Logo />
      <SearchBar />
      <div className="flex items-center gap-6">
        <WriteIcon />
        <NotificationBell />
        <Avatar size="big" name="Ronit" />
      </div>
    </div>
  );
}

export default Appbar;
