// import { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const onSubmitData = e => {
    e.preventDefault();
    onSubmit(search);

    if (search.trim() === '') {
      alert('The field is empty');
      return;
    }
  };

  const onInputChange = e => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmitData}>
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
          onChange={onInputChange}
          value={search}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
