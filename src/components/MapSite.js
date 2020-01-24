import React from 'react';
import Header from './Header';
import WeatherMap from './WeatherMap';
import SearchBar from './Searchbar';

class MapSite extends React.Component {

  handleAddPoints = (points) => {
    if (!points) {
      return 'Enter valid numerical value';
    }
    return;
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


