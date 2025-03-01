import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../library/hooks/reduxHook";
import { fetchCovidData } from "../redux/covidDataSlice";
import Dropdown from "../components/Dropdown";


function Dashboard() {
  const dispatch = useAppDispatch();
  const covidData = useAppSelector((state)=>state.covid.covidStat);

  useEffect(() => {
    dispatch(fetchCovidData());
  }, []);
  return <div>
    <Dropdown regions={covidData.regional}/>
  </div>;
}

export default Dashboard;
