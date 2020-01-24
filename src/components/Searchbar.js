import React from 'react';

class SearchBar extends React.Component {
  state = {
    error: undefined
  };

  handleAddPoints = (e) => {
    e.preventDefault();

    const points = e.target.elements.points.value.trim();
    const error = this.props.handleAddPoints(points);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.points.value = '';
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p className="add-points-error">{this.state.error}</p>}
        <form
          className="add-points"
          onSubmit={this.handleAddPoints}
        >
          <input
            type="text"
            name="points"
            className="add-points__input"
            placeholder="enter number"
          />
          <button className="button">Search</button>
        </form>
      </div>
    )
  }
}

export default SearchBar;