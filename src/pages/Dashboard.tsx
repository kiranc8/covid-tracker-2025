import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../library/hooks/reduxHook";
import { fetchCovidData, fetchCovidStatHistory } from "../redux/covidDataSlice";
import Dropdown from "../components/Dropdown";
import StatsSection from "../components/StatsSection";
import ChartSection from "../components/ChartSection";
import Map from "../components/Map";
import "../styles/Dashboard.css";
import "../styles/Map.css"

function Dashboard() {
  const dispatch = useAppDispatch();
  const covidData = useAppSelector((state) => state.covid.covidStat);
  const selectedState = useAppSelector((state) => state.covid.selectedRegion);

  const filteredData = covidData.regional.filter((item) => item.loc === selectedState);

  useEffect(() => {
    dispatch(fetchCovidData());
    dispatch(fetchCovidStatHistory());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-titles">
            <h1>COVID-19 Tracker</h1>
            <p className="subtitle">Real-time Statistics & Visualizations</p>
          </div>
          <div className="header-controls">
            <Dropdown regions={covidData.regional} />
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        {filteredData[0]?.loc && (
          <>
            <section className="stats-section">
              <StatsSection filteredData={filteredData[0]} />
            </section>

            <section className="visualization-section">
              <ChartSection filteredData={filteredData[0]} />
              <div className="map-container">
                <h3 className="map-title">{selectedState} Case Distribution Map</h3>
                <Map stats={filteredData[0]} />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;