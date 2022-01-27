import { Component } from 'react';
import { GlobalStyle } from './Components/GlobalStyles';
import { SearchBar } from 'Components/SearchBar/SearchBar';
import { ImageGallery } from 'Components/ImageGallery/ImageGallery';
import { Button } from 'Components/Button/Button';
import { Loader } from 'Components/Loader/Loader';
import { Modal } from 'Components/Modal/Modal';
import { getPictures } from 'services/pickturesApi';

export class App extends Component {
  state = {
    images: [],
    pageNumber: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImage: '',
    error: null,
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      images: [],
      pageNumber: 1,
      searchQuery: query.trim(),
      error: null,
    });
  };

  fetchImages = () => {
    const { searchQuery, pageNumber } = this.state;
    const arg = { searchQuery, pageNumber };
    if (!searchQuery) return;

    this.setState({ isLoading: true });

    getPictures(arg)
      .then(({ hits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          pageNumber: prevState.pageNumber + 1,
          total: hits.length,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  toggleModal = () => {
    this.setState({ largeImage: '', showModal: false });
  };

  openModal = largeImageURL => {
    this.setState({ largeImage: largeImageURL, showModal: true });
  };
  render() {
    const { images, isLoading, showModal, largeImage, error, total } =
      this.state;

    const showLoadMoreButton = images.length !== 0 && !isLoading && total > 0;

    console.log(showLoadMoreButton);
    return (
      <>
        <GlobalStyle />
        <div>
          <SearchBar onSubmit={this.onChangeQuery} />

          {error && <p>Произошла ошибка ...</p>}

          <ImageGallery images={images} onImageClick={this.openModal} />

          {showLoadMoreButton && <Button onClick={this.fetchImages} />}

          {isLoading && <Loader />}

          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeImage} alt="" />
            </Modal>
          )}
        </div>
      </>
    );
  }
}

export default App;
