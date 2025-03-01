import React from "react";
import StatCard from "./StatCard";
import { Regional } from "../interfaces/interface";

import "../styles/StatCard.css"

interface StatsSectionProps {
  filteredData: Regional;
}

const StatsSection: React.FC<StatsSectionProps> = ({ filteredData }) => {
  const { totalConfirmed, discharged, deaths } = filteredData;
  const activeCases = totalConfirmed - (discharged + deaths);

  return (
    <div className="stats-container">
      <StatCard 
        title="Total Cases" 
        value={totalConfirmed} 
        colorClass="total" 
        icon="📈"
      />
      <StatCard 
        title="Active Cases" 
        value={activeCases} 
        colorClass="active" 
        icon="🦠"
      />
      <StatCard 
        title="Recovered" 
        value={discharged} 
        colorClass="recovered" 
        icon="❤️"
      />
      <StatCard 
        title="Deaths" 
        value={deaths} 
        colorClass="deaths" 
        icon="💔"
      />
    </div>
  );
};

export default StatsSection;