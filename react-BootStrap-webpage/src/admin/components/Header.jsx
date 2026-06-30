import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <div className="admin-header">
      <h4>Admin Dashboard</h4>

      <button
        className="btn btn-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Header;