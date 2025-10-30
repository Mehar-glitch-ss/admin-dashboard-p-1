// src/components/layout/Navbar.jsx
const Navbar = () => {
  return (
    <div className="h-16 bg-purple-100 border-b border-gray-200 flex items-center justify-between px-6 shadow-sm sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-stone-800 hover:text-purple-800">
        Admin Dashboard
      </h1>
      <div className="flex items-center space-x-3">
        <span className="text-gray-600">Hello, Admin</span>
        <img
          src="https://via.placeholder.com/32"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
