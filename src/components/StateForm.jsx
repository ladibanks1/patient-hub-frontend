import  { useState } from "react";
import useGetState from "../hooks/useGetState";
import "../css/Form.css";

// State and LGas Component
const State = ({state = "" , LGA  , handleChange = () => {}}) => {
  const [selectedState, setSelectedState] = useState(state);
  const {
    states,
    loading,
    error: stateError,
    lga,
  } = useGetState(selectedState);
  return (
    <>
    <label htmlFor="state">State:</label>
      <select
        name="state"
        id="state"
        className="w-full"
        required
        value={selectedState}
        onChange={(e) => {
          setSelectedState(e.target.value);
          handleChange(e);
        }}
      >
        <option value="">Select State</option>
        {loading ? (
          <option value="">Loading....</option>
        ) : (
          <>
            {states.map((state, index) => (
              <option value={state} key={index}>
                {state}
              </option>
            ))}
          </>
        )}
      </select>
      {stateError && <p className="text-red-500">{stateError}</p>}
      {selectedState && (
        <>
        <label htmlFor="LGA">Local Goverment Area: </label>
          <select name="LGA" className="w-full" id="LGA" value={LGA} onChange={handleChange} required>
            <option value="">Select LGA</option>
            {lga.map((lga, index) => (
              <option value={lga} key={index}>
                {lga}
              </option>
            ))}
          </select>
          {stateError && <p className="text-red-500">{stateError}</p>}
        </>
      )}
    </>
  );
};

export default State;
