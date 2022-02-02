import { useEffect, useState } from 'react';
import { GlobalStyle } from './Components/GlobalStyles';
import { SearchBar } from 'Components/SearchBar/SearchBar';
import { ImageGallery } from 'Components/ImageGallery/ImageGallery';
import { Button } from 'Components/Button/Button';
import { Loader } from 'Components/Loader/Loader';
import { Modal } from 'Components/Modal/Modal';
import { getPictures } from 'services/pickturesApi';

export const App = () => {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!searchQuery) {
      return; //если в searchQuery нет ничего запрос не отправлять
    }
    const fetchImages = () => {
      if (pageNumber === 1) setIsLoading(true);

      getPictures(searchQuery, pageNumber)
        .then(({ hits }) => {
          console.log('hits', hits);
          setImages(images => [...images, ...hits]); //при каждом новом клике распыляем предыдущее и настоящее в новый массив
          setTotal(hits.length);

          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => setError(error.massage))
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchImages();
  }, [searchQuery, pageNumber]);

  const onChangeQuery = query => {
    setSearchQuery(query.trim()); //обрезание пробелов
    setPageNumber(1);
    setError(null);
    setImages([]);
  };
  const toggleModal = () => {
    setLargeImage('');
    setShowModal(true);
  };

  const openModal = largeImageURL => {
    setLargeImage(largeImageURL);
    setShowModal(true);
  };
  const handleLoadMore = () => {
    setPageNumber(page => page + 1);
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
