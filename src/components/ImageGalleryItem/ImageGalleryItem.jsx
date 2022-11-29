import PropTypes from 'prop-types';
import React from 'react';
import { GalleryListItem, GalleryImg } from './ImageGalleryItem.styled';

export default function GalleryItem({
  src,
  alternative,
  onImgClick,
  largSrc,
  shareSrc,
}) {
  return (
    <GalleryListItem>
      <GalleryImg
        src={src}
        alt={alternative}
        onClick={() => {
          onImgClick();
          shareSrc(largSrc, alternative);
        }}
      />
    </GalleryListItem>
  );
}

GalleryItem.propTypes = {
  alternative: PropTypes.string.isRequired,
  largSrc: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
  shareSrc: PropTypes.func.isRequired,
};
