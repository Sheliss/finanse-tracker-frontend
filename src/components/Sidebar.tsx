import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className=" p-2 bg-gray-200 h-full flex flex-col">
      <button className="p-2 cursor-pointer" onClick={() => navigate("/")}>
        Dashboard
      </button>
      <button
        className="p-2 cursor-pointer"
        onClick={() => navigate("/expenses")}
      >
        Expenses
      </button>
    </div>
  );
};
export default Sidebar;
