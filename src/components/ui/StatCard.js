// src/components/ui/StatCard.jsx
const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${color}`}
      >
        {Icon && <Icon className="text-white text-2xl" />}
      </div>
    </div>
  );
};

export default StatCard;
