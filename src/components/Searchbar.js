import { Component } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  onSubmitData = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);

    if (this.state.search.trim() === '') {
      alert('The field is empty');
      return;
    }

    this.setState({ search: '' });
  };

  onInputChange = e => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmitData}>
          <button type="submit" className="SearchForm-button">
            <FiSearch className="FiSearch" />
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
            value={this.state.search}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
