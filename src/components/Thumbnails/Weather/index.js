import React from 'react'
import './style.scss'

const Weather = ({icon, degrees, city}) => {
  return (
    <div className="row weather">
      <div className="col-sm-6">
        <img src={icon}  className="weather__icon" alt="weather" />
      </div>
      <div className="col-sm-6">
        <div className="weather__degrees">
          {degrees}
        </div>
      </div>
      <div className="col-sm-12">
        <div className="weather__city">
          {city}
        </div>
      </div>
    </div>
  );
};

export default Weather