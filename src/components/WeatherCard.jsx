import React from 'react';

function WeatherCard(props){
  return (
      <div className="col-lg-3 col-md-4">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">{props.location}</h1>
            <p>{props.date}</p>
            <img src={props.img} alt="weather" />
            <h1>{props.temp} °F</h1>
            <p>{props.description}</p>
          </div>
        </div>
      </div>
  );
}

export default WeatherCard;
