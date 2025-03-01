import React from "react";
import "../styles/StatCard.css";

interface StatCardProps {
  title: string;
  value: number;
  colorClass: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, colorClass, icon }) => {
  return (
    <div className={`stat-card ${colorClass} animate-in`}>
      <div className="card-header">
        <span className="stat-icon">{icon}</span>
        <h3 className="stat-title">{title}</h3>
      </div>
      <p className="stat-value">
        {value.toLocaleString()}
      </p>
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>
    </div>
  );
};

export default StatCard;