import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { toast } from 'react-toastify';
import React, { Component } from 'react';
import {
  Form,
  Header,
  SearchBtn,
  SearchBtnLabel,
  SearchInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  onFormSubmit = e => {
    e.preventDefault();

    const { query } = this.state;

    if (query.trim() === '') {
      toast.error('Please fill the search form');
      return;
    }

    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  handleInputChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.onFormSubmit}>
          <SearchBtn type="submit">
            <BiSearch style={{ width: 25, height: 25 }} />
            <SearchBtnLabel>Search</SearchBtnLabel>
          </SearchBtn>
          <SearchInput
            value={this.state.query}
            onChange={this.handleInputChange}
            name="query"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
