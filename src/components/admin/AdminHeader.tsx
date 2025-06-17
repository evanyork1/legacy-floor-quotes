
import React from "react";

interface AdminHeaderProps {}

const AdminHeader: React.FC<AdminHeaderProps> = () => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
      <p className="text-blue-200">Manage your garage floor coating business</p>
    </div>
  );
};

export default AdminHeader;
