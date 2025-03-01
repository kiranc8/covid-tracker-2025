import React from "react";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import { Regional } from "../interfaces/interface";

import "../styles/Chart.css"

interface StatsSectionProps {
  filteredData: Regional;
}

const ChartSection: React.FC<StatsSectionProps> = ({ filteredData }) => {
  const { totalConfirmed, discharged, deaths } = filteredData;
  const activeCases = totalConfirmed - (discharged + deaths);
  return (
    <div className="chart-section">
      <PieChart active={activeCases} recovered={discharged} death={deaths} />
      <LineChart/>
    </div>
  );
};

export default ChartSection;
