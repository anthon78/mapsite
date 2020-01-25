import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import sunImage from '../assets/sun.png';
import rainImage from '../assets/rain.png';
import snowImage from '../assets/snow.png';
import weatherImage from '../assets/weather.png';

class WeatherMap extends React.Component {
  state = {
    viewport: {
      width: "100vw",
      height: "75vh",
      latitude: 0,
      longitude: 0,
      zoom: 1.5
    },
    selectedLocation: undefined
  }

  getimage = (temp, weather) => {
    if (temp >= 75) return sunImage;
    if (temp <= 32) return snowImage;
    if (weather === "Rain") return rainImage;
    return weatherImage
  }

  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiYW50aG9uNzgiLCJhIjoiY2s1c2dubXEyMG5qeDNtbnFkMW82Mms4MCJ9.9H2KWlKXAehk0eqO3iFSbQ"
          onViewportChange={viewport => {
            this.setState({ viewport })
          }}
        >
          {this.props.weatherDataList.length > 0 && this.props.weatherDataList.map((weatherInfo, index) => (
            <Marker
              key={index}
              latitude={weatherInfo.coord.lat}
              longitude={weatherInfo.coord.lon}
            >
              <button
                className="button-alt"
                onClick={e => {
                  e.preventDefault();
                  this.setState(() => ({ selectedLocation: weatherInfo }));
                }}
              >
                <img src={this.getimage(weatherInfo.main.temp, weatherInfo.weather[0].main)} alt="Sun Icon" />
              </button>
            </Marker>
          ))}

          {this.state.selectedLocation &&
            <Popup
              latitude={this.state.selectedLocation.coord.lat}
              longitude={this.state.selectedLocation.coord.lon}
              onClose={() => {
                this.setState(() => ({ selectedLocation: undefined }));
              }}
            >
              <div>
                <p>lat: {this.state.selectedLocation.coord.lat}, lon: {this.state.selectedLocation.coord.lon}</p>
                <p>outlook: {this.state.selectedLocation.weather[0].description}</p>
                <p>temperature: {this.state.selectedLocation.main.temp} F</p>
                <p>humidity: {this.state.selectedLocation.main.humidity}</p>
                <p>wind: {this.state.selectedLocation.wind.speed}mph</p>
              </div>
            </Popup>
          }


        </ReactMapGL>
      </div>
    )
  }
}

export default WeatherMap;