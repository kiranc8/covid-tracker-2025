import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../library/hooks/reduxHook";
import { updateSelectedState } from "../redux/covidDataSlice";
import "../styles/Dropdown.css"

interface Region {
  loc: string;
}

interface StateDropdownProps {
  regions: Region[];
}

const Dropdown: React.FC<StateDropdownProps> = ({ regions }) => {
  const dispatch = useAppDispatch();
   const selectedState = useAppSelector((state)=>state.covid.selectedRegion);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (state: string) => {
    dispatch(updateSelectedState(state));
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      {/* Selected State Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
        {selectedState || "Select a State"}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="dropdown-list">
          {regions.map((region) => (
            <li key={region.loc} onClick={() => handleSelect(region.loc)} className="dropdown-item">
              {region.loc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
