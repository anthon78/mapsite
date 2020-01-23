import React from 'react';
import Header from './Header';
import WeatherMap from './WeatherMap';
import SearchBar from './Searchbar';

class MapSite extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <WeatherMap />
        <SearchBar />
      </div>
    )
  }
}

export default MapSite;


