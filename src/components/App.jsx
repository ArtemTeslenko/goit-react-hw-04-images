import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Searchbar from './Searchbar';
import Gallery from './ImageGallery';
import ShowModal from './Modal';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImgData, setLargeImgData] = useState({ src: '', alt: '' });
  const [isQueryChanged, setisQueryChanged] = useState(false);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setisQueryChanged(true);
  };

  const shareSrc = (src, alt) => {
    setLargeImgData({ src, alt });
  };

  const loadMore = () => {
    setisQueryChanged(false);
    setPage(prev => prev + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      <Gallery
        query={query}
        page={page}
        onImgClick={() => setShowModal(prev => !prev)}
        shareSrc={shareSrc}
        loadMore={loadMore}
        isQueryChanged={isQueryChanged}
      />
      {showModal && (
        <ShowModal onClose={() => setShowModal(prev => !prev)}>
          <img src={largeImgData.src} alt={largeImgData.alt} />
        </ShowModal>
      )}
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        theme={'colored'}
      />
    </div>
  );
}
