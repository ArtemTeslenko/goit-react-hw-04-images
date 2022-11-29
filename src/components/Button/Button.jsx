import PropTypes from 'prop-types';
import React from 'react';
import { BtnWrapper, Button } from './Button.styled';

export default function LoadMore({ onLoadMoreClick, children }) {
  return (
    <BtnWrapper>
      <Button type="button" onClick={() => onLoadMoreClick()}>
        {children}
      </Button>
    </BtnWrapper>
  );
}

LoadMore.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};
