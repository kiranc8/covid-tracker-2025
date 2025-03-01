import Plot from "react-plotly.js";
import { useAppSelector } from "../library/hooks/reduxHook";
import "../styles/Chart.css";

function LineChart() {
  const selectedState = useAppSelector((state) => state.covid.selectedRegion);
  const statHistory = useAppSelector((state) => state.covid.statHistory);

  // Filter data based on selected state
  const filteredData = statHistory
    ?.map((day) => {
      const stateData = day.regional.find(
        (region) => region.loc === selectedState
      );
      return stateData
        ? {
            day: day.day,
            confirmedCases: stateData.totalConfirmed,
            activeCases:
              stateData.totalConfirmed -
              stateData.discharged -
              stateData.deaths,
            deathCases: stateData.deaths,
          }
        : null;
    })
    .filter(Boolean); // Remove null values

  const xData =
    filteredData
      ?.slice(-10)
      .map((d) => d?.day)
      .filter((day): day is string => day !== undefined) || [];
  const confirmedCases =
    filteredData
      ?.slice(-10)
      .map((d) => d?.confirmedCases)
      .filter((count): count is number => count !== undefined) || [];
  const activeCases =
    filteredData
      ?.slice(-10)
      .map((d) => d?.activeCases)
      .filter((count): count is number => count !== undefined) || [];
  const deathCases =
    filteredData
      ?.slice(-10)
      .map((d) => d?.deathCases)
      .filter((count): count is number => count !== undefined) || [];

  const data = [
    {
      x: xData,
      y: confirmedCases,
      type: "scatter",
      mode: "lines+markers",
      name: "Confirmed Cases",
      marker: { color: "#FF4136" },
      line: { width: 2 },
    },
    {
      x: xData,
      y: activeCases,
      type: "scatter",
      mode: "lines+markers",
      name: "Active Cases",
      marker: { color: "#0074D9" },
      line: { width: 2 },
    },
    {
      x: xData,
      y: deathCases,
      type: "scatter",
      mode: "lines+markers",
      name: "Death Cases",
      marker: { color: "#efc210" },
      line: { width: 2 },
    },
  ];

  const layout = {
    width: "100%",
    height: 655,
    title: `COVID-19 Cases in ${selectedState || "Selected Region"}`,
    xaxis: { title: "Date", titlefont: { size: 14 } },
    yaxis: { title: "Number of Cases", titlefont: { size: 14 } },
    legend: { x: 0.1, y: 1.1, orientation: "h" },
    margin: { t: 50, r: 30, b: 80, l: 80 },
  };

  return (
    <div className="chart-container glassmorphism">
      <Plot data={data} layout={layout} config={{ responsive: true }} />
    </div>
  );
}

export default LineChart;
