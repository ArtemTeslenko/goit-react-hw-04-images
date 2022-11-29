import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery.styled';
import { Urging, Loader } from './Helpers.styled';
import GalleryItem from '../ImageGalleryItem';
import LoadMore from '../Button';
import autoscroll from '../Utils';

class Gallery extends Component {
  state = {
    images: [],
    error: null,
    isLoading: false,
    totalHits: 0,
  };

  COMMON_URL = 'https://pixabay.com/api/';
  KEY = '30103302-a3ef06cdfdc78e2e196d775c9';

  componentDidUpdate(prevProps, _) {
    const { query, page } = this.props;

    if (prevProps.query !== query) {
      this.setState({
        images: [],
      });
    }

    if (prevProps.page !== page || prevProps.query !== query) {
      this.setState({
        isLoading: true,
      });

      fetch(
        `${this.COMMON_URL}?key=${this.KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error('Search error, please put the correct value.')
          );
        })
        .then(data =>
          this.setState(previous => ({
            images: [...previous.images, ...data.hits],
            isLoading: false,
            totalHits: data.totalHits,
          }))
        )
        .catch(error => this.setState({ error }));
    }
    autoscroll();
  }

  onLoadMoreClick = () => {
    this.props.loadMore();
  };

  render() {
    const { images, isLoading, error, totalHits } = this.state;
    const { onImgClick, shareSrc } = this.props;
    return (
      <>
        {error && <p>{error}</p>}
        {images.length < 1 && !isLoading ? (
          <Urging>Start searching.</Urging>
        ) : null}
        {images && (
          <div className="gallery">
            <ImageGallery>
              {images &&
                images.map(({ id, tags, webformatURL, largeImageURL }) => {
                  return (
                    <GalleryItem
                      key={id}
                      alternative={tags}
                      src={webformatURL}
                      largSrc={largeImageURL}
                      onImgClick={onImgClick}
                      shareSrc={shareSrc}
                    />
                  );
                })}
            </ImageGallery>
          </div>
        )}
        {!isLoading && images.length > 0 && images.length < totalHits ? (
          <LoadMore onLoadMoreClick={this.onLoadMoreClick}>Load more</LoadMore>
        ) : null}
        {isLoading && (
          <Loader>
            <ThreeDots color="#3f51b5" ariaLabel="three-dots-loading" />
          </Loader>
        )}
      </>
    );
  }
}

export default Gallery;

Gallery.propTypes = {
  shareSrc: PropTypes.func.isRequired,
  onImgClick: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
};
