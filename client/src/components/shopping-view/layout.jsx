import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

const ShoppingLayout = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden">
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
