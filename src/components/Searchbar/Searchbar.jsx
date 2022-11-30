import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import {
  Form,
  Header,
  SearchBtn,
  SearchBtnLabel,
  SearchInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Please fill the search form');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={onFormSubmit}>
        <SearchBtn type="submit">
          <BiSearch style={{ width: 25, height: 25 }} />
          <SearchBtnLabel>Search</SearchBtnLabel>
        </SearchBtn>
        <SearchInput
          value={query}
          onChange={e => setQuery(e.currentTarget.value.toLowerCase())}
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
