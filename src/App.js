import { useEffect, useState } from 'react';
import { GlobalStyle } from './Components/GlobalStyles';
import { SearchBar } from 'Components/SearchBar/SearchBar';
import { ImageGallery } from 'Components/ImageGallery/ImageGallery';
import { Button } from 'Components/Button/Button';
import { Loader } from 'Components/Loader/Loader';
import { Modal } from 'Components/Modal/Modal';
import { getPictures } from 'services/pickturesApi';

export const App = () => {
  // state = {
  //   images: [],
  //   pageNumber: 1,
  //   searchQuery: '',
  //   isLoading: false,
  //   showModal: false,
  //   largeImage: '',
  //   error: null,
  //   total: 0,
  // };
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchQuery !== this.state.searchQuery) {
  //     this.fetchImages();
  //   }
  // }
  useEffect(() => {
    if (searchQuery !== '') {
      fetchImages();
    }
  }, [searchQuery]);

  const onChangeQuery = query => {
    setImages([]);
    setPageNumber(1);
    // setPageNumber(pageNumber => pageNumber + 1);
    setSearchQuery(query.trim());
    setError(null);
    // this.setState({
    //   images: [],
    //   pageNumber: 1,
    //   searchQuery: query.trim(),
    //   error: null,
    // });
  };

  const fetchImages = () => {
    if (!searchQuery) return;
    setIsLoading(true);
    // this.setState({ isLoading: true });

    getPictures(searchQuery, pageNumber)
      .then(({ hits }) => {
        setImages(images => [...images, ...hits]);
        setPageNumber(pageNumber => pageNumber + 1);
        setTotal(hits.length);

        // this.setState(prevState => ({images: [...prevState.images, ...hits],
        //   pageNumber: prevState.pageNumber + 1,
        //   total: hits.length,
        // }));

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => setError(error.massage))
      .finally(() => {
        setIsLoading(false);
        // this.setState({ isLoading: false });
      });
  };

  const toggleModal = () => {
    setLargeImage('');
    setShowModal(true);
    // this.setState({ largeImage: '', showModal: false });
  };

  const openModal = largeImageURL => {
    setLargeImage(largeImageURL);
    setShowModal(true);
    // this.setState({ largeImage: largeImageURL, showModal: true });
  };
  const handleLoadMore = () => {
    setPageNumber(prev => prev + 1);
  };
  const showLoadMoreButton = images.length !== 0 && !isLoading && total > 0;

  console.log(showLoadMoreButton);
  return (
    <>
      <GlobalStyle />
      <div>
        <SearchBar onSubmit={onChangeQuery} />

        {error && <p>Произошла ошибка ...</p>}

        <ImageGallery images={images} onImageClick={openModal} />

        {showLoadMoreButton && <Button onClick={handleLoadMore} />}

        {isLoading && <Loader />}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
      </div>
    </>
  );
};

export default App;
