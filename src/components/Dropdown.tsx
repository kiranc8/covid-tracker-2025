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
  const selectedState = useAppSelector((state) => state.covid.selectedRegion);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (state: string) => {
    dispatch(updateSelectedState(state));
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`dropdown-button ${isOpen ? 'active' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedState || "Select a State"}</span>
        <svg
          className={`chevron ${isOpen ? 'open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-list-container">
          <ul className="dropdown-list" role="listbox">
            {regions.map((region) => (
              <li
                key={region.loc}
                onClick={() => handleSelect(region.loc)}
                className={`dropdown-item ${
                  selectedState === region.loc ? 'selected' : ''
                }`}
                role="option"
                aria-selected={selectedState === region.loc}
              >
                {region.loc}
                {selectedState === region.loc && (
                  <svg
                    className="checkmark"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;