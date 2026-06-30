import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3 className="logo">Admin Panel</h3>

      <NavLink to="/admin/dashboard">
 Dashboard
</NavLink>

<NavLink to="/admin/categories">
 Categories
</NavLink>

<NavLink to="/admin/groups">
 Groups
</NavLink>

<NavLink to="/admin/values">
 Values
</NavLink>

<NavLink to="/admin/products">
 Products
</NavLink>
<NavLink to="/admin/Orders">
Orders</NavLink>
    </div>
  );
}

export default Sidebar;