import React from "react";
import "../styles/StatCard.css";

interface StatCardProps {
  title: string;
  value: number;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, colorClass }) => {
  return (
    <div className="stat-card">
      <h3 className="stat-title">{title}</h3>
      <p className="stat-value">{value.toLocaleString()}</p>
      <div className={`stat-bottom-line ${colorClass}`} />
    </div>
  );
};

export default StatCard;
