import { useLocation, useNavigate } from "react-router-dom";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  const navigate = useNavigate();
  const currentRoute = useLocation();

  return (
    <div className=" bg-neutral-900 dark:bg-neutral-950 flex flex-col col-span-2 h-screen">
      <div className="h-16 pl-12 mb-4 font-bold text-xl text-white flex items-center border-b border-neutral-800">
        Finanse Tracker
      </div>
      <SidebarButton
        isActive={currentRoute.pathname === "/"}
        onClick={() => navigate("/")}
      >
        Dashboard
      </SidebarButton>
      <SidebarButton
        isActive={currentRoute.pathname === "/expenses"}
        onClick={() => navigate("/expenses")}
      >
        Transactions
      </SidebarButton>
    </div>
  );
};
export default Sidebar;
