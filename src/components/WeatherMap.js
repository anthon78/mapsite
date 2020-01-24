import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

class WeatherMap extends React.Component {
  state = {
    viewport: {
      width: "100vw",
      height: "75vh",
      latitude: 40.0150,
      longitude: 105.2705,
      zoom: 7
    },
  }



  render() {
    console.log(this.props.weatherDataList);
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
              <button>
                Button here
              </button>
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    )
  }
}

export default WeatherMap;