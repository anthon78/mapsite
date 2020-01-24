import React from 'react';
import Header from './Header';
import WeatherMap from './WeatherMap';
import SearchBar from './Searchbar';
import RandomOrg from 'random-org';

class MapSite extends React.Component {
  state = {
    latLongPoints: [],
    points: undefined,
  }

  componentDidUpdate() {
    this.getRandomLatLongPoints(this.state.points);
  }

  handleAddPoints = (points) => {
    if (!points) {
      return 'Enter valid numerical value';
    }
    this.setState(() => ({ points }));
  };

  getRandomLatLongPoints = (total) => {
    let random = new RandomOrg({ apiKey: 'c40ba9e1-c548-43cf-b1d3-9f60187d0c0e' });
    let latitudes;
    let longitudes;
    let latLongs;
    random.generateIntegers({ min: -90, max: 90, n: total })
      .then((result) => {
        latitudes = result.random.data;
        random.generateIntegers({ min: -180, max: 180, n: total })
          .then((result) => {
            longitudes = result.random.data;
            latLongs = this.mergeTwoEqualLists(latitudes, longitudes);
            this.setState(() => ({ latLongPoints: latLongs }))
          })
      })
  }

  mergeTwoEqualLists = (l1, l2) => {
    let newList = [];
    for (let i = 0; i < l1.length; i++) {
      newList.push([l1[i], l2[i]]);
    }
    return newList;
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


