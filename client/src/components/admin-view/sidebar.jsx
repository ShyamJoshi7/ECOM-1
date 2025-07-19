import { adminSidebarMenuItems } from "@/config";
import { ChartNoAxesCombined } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const MenuItems = () => {
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map()}
    </nav>
  );
};

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => {
            navigate("/admin/dashboard");
          }}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
