import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../library/hooks/reduxHook";
import { fetchCovidData } from "../redux/covidDataSlice";
import Dropdown from "../components/Dropdown";
import StatsSection from "../components/StatsSection";

import "../styles/Dashboard.css"

function Dashboard() {
  const dispatch = useAppDispatch();
  const covidData = useAppSelector((state) => state.covid.covidStat);
  const selectedState = useAppSelector((state) => state.covid.selectedRegion);

  const filteredData = covidData.regional.filter((item) => {
    return item.loc === selectedState;
  });

  console.log(filteredData)

  useEffect(() => {
    dispatch(fetchCovidData());
  }, []);
  
  return (
    <div className="dashboard-container">
      <Dropdown regions={covidData.regional} />
      {filteredData[0]?.loc && <StatsSection filteredData={filteredData[0]} />}
    </div>
  );
}

export default Dashboard;
