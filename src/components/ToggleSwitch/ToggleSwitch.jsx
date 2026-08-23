import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );
  const isCelsius = currentTemperatureUnit === "C";

  return (
    <label
      className={`toggle-switch ${isCelsius ? "toggle-switch_celsius" : ""}`}
    >
      <input
        className="toggle-switch__input"
        type="checkbox"
        checked={isCelsius}
        onChange={handleToggleSwitchChange}
        aria-label="Switch temperature unit"
      />
      <span className="toggle-switch__track">
        <span className="toggle-switch__unit toggle-switch__unit_fahrenheit">
          F
        </span>
        <span className="toggle-switch__unit toggle-switch__unit_celsius">
          C
        </span>
        <span className="toggle-switch__thumb" />
      </span>
    </label>
  );
}

export default ToggleSwitch;
