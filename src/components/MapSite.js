import React from 'react';
import Header from './Header';
import WeatherMap from './WeatherMap';
import SearchBar from './Searchbar';
import RandomOrg from 'random-org';
import axios from 'axios';

class MapSite extends React.Component {
  state = {
    latLongPoints: [],
  }

  handleAddPoints = (points) => {
    if (!points) {
      return 'Enter valid numerical value';
    }
    this.getRandomLatLongPoints(points);
  };

  getRandomLatLongPoints = (total) => {
    axios.post('/api/latLongPoints', {
      total: total,
    })
      .then(result => {
        this.setState(() => ({ latLongPoints: result.data }))
      })
  }

  render() {
    return (
      <div>
        <Header />
        <WeatherMap />
        <SearchBar
          handleAddPoints={this.handleAddPoints}
        />
      </div>
    )
  }
}

export default MapSite;


