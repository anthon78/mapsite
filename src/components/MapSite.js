import React from 'react';
import Header from './Header';
import WeatherMap from './WeatherMap';
import SearchBar from './Searchbar';
import axios from 'axios';

class MapSite extends React.Component {
  state = {
    latLongPoints: [],
    weatherDataList: []
  }

  handleAddPoints = (points) => {
    points = Number(points);
    if (!points) {
      return 'Enter valid numerical value';
    } else if (!Number.isInteger(points)) {
      return 'Enter an integer';
    } else if (points <= 0) {
      return 'Enter an integer grater than 0';
    }
    else if (points >= 500) {
      return 'Enter a number less than 500'
    }
    this.getRandomLatLongPoints(points)
      .then(coordinates => {
        this.getWeatherData(coordinates);
      })
  };

  getWeatherData = (coordinates) => {
    return axios.post('/api/weatherData', {
      coordinates: coordinates
    })
      .then(result => {
        this.setState(() => ({ weatherDataList: result.data }))
      })
  }

  getRandomLatLongPoints = (total) => {
    return axios.post('/api/latLongPoints', {
      total: total,
    })
      .then(result => {
        this.setState(() => ({ latLongPoints: result.data }))
        return result;
      })
  }

  render() {
    return (
      <div>
        <Header />
        <SearchBar
          handleAddPoints={this.handleAddPoints}
        />
        <WeatherMap
          weatherDataList={this.state.weatherDataList}
        />
      </div>
    )
  }
}

export default MapSite;


