import { useState } from "react";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="relative">
      <Bell
        onClick={() => setShowNotifications((prev) => !prev)}
        className="w-5 h-5 text-gray-700 hover:text-black cursor-pointer"
      />
      {showNotifications && (
        <div className="absolute top-8 right-0 bg-white shadow-lg rounded-md p-4 w-64">
          <p className="text-sm text-gray-500">No new notifications.</p>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
