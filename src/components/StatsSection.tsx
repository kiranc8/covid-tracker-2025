import React from "react";
import StatCard from "./StatCard";
import "../styles/StatCard.css"
import { Regional } from "../interfaces/interface";

interface StatsSectionProps {
  filteredData:Regional;
}

const StatsSection: React.FC<StatsSectionProps> = ({ filteredData }) => {
  const { totalConfirmed, discharged, deaths } = filteredData;
  const activeCases = totalConfirmed - (discharged + deaths);

  return (
    <div className="stats-container">
      <StatCard title="Total Cases" value={totalConfirmed} colorClass="blue-line" />
      <StatCard title="Active Cases" value={activeCases} colorClass="orange-line" />
      <StatCard title="Recovered" value={discharged} colorClass="green-line" />
      <StatCard title="Deaths" value={deaths} colorClass="red-line" />
    </div>
  );
};

export default StatsSection;
