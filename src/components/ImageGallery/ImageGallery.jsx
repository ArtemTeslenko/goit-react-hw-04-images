import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import { useState, useRef, useEffect } from 'react';
import { ImageGallery } from './ImageGallery.styled';
import { Urging, Loader } from './Helpers.styled';
import GalleryItem from '../ImageGalleryItem';
import LoadMore from '../Button';
import autoscroll from '../Utils';

export default function Gallery({
  shareSrc,
  onImgClick,
  query,
  loadMore,
  page,
  isQueryChanged,
}) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  const COMMON_URL = useRef('');
  const KEY = useRef('');

  useEffect(() => {
    COMMON_URL.current = 'https://pixabay.com/api/';
    KEY.current = '30103302-a3ef06cdfdc78e2e196d775c9';
  }, []);

  useEffect(() => {
    if (!query) {
      return;
    }
    if (isQueryChanged) {
      setImages([]);
    }

    setIsLoading(true);
    fetch(
      `${COMMON_URL.current}?key=${KEY.current}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error('Search error, please put the correct value.')
        );
      })
      .then(data => {
        setImages(prev => [...prev, ...data.hits]);
        setTotalHits(data.totalHits);
      })
      .catch(error => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page, isQueryChanged]);

  useEffect(() => {
    autoscroll();
  }, [images]);

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
        <LoadMore onLoadMoreClick={() => loadMore()}>Load more</LoadMore>
      ) : null}
      {isLoading && (
        <Loader>
          <ThreeDots color="#3f51b5" ariaLabel="three-dots-loading" />
        </Loader>
      )}
    </>
  );
}

Gallery.propTypes = {
  shareSrc: PropTypes.func.isRequired,
  onImgClick: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
  isQueryChanged: PropTypes.bool.isRequired,
};
