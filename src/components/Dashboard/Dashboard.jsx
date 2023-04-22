import React, { useEffect } from "react";
import "./Dashboard.scss";

const Dashboard = ({ title, ...props }) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="dashboard-container">
      <main>
        <h3>{title}</h3>
        {props.children}
      </main>
    </div>
  );
};

export default Dashboard;
