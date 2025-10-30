// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Users", path: "/users" },
    { name: "Plans", path: "/plans" },
    { name: "Logs", path: "/logs" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-purple-50 text-stone-500 flex flex-col fixed">
      <div className="text-2xl font-bold p-4 border-b border-gray-700">
        Kipplo Admin
      </div>
      <ul className="flex flex-col p-4 space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${
                  isActive ? "bg-purple-200" : "hover:bg-purple-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
