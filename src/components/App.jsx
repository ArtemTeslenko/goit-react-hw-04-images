import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import Searchbar from './Searchbar';
import Gallery from './ImageGallery';
import ShowModal from './Modal';

class App extends Component {
  state = {
    query: '',
    page: 1,
    showModal: false,
    largeImgData: { src: '', alt: '' },
    isQueryChanged: false,
  };

  setQuery = query => {
    this.setState({ query: query, page: 1, isQueryChanged: true });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  shareSrc = (src, alt) => {
    this.setState({ largeImgData: { src, alt } });
  };

  loadMore = () => {
    this.setState(prev => ({
      isQueryChanged: false,
      page: (prev.page += 1),
    }));
  };

  render() {
    const { largeImgData, showModal, query, page, isQueryChanged } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.setQuery} />
        <Gallery
          query={query}
          page={page}
          onImgClick={this.toggleModal}
          shareSrc={this.shareSrc}
          loadMore={this.loadMore}
          isQueryChanged={isQueryChanged}
        />
        {showModal && (
          <ShowModal onClose={this.toggleModal}>
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
}

export default App;
