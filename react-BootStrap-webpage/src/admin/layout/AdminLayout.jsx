import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../../styles/Admin.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-main">
        <Header />

        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;