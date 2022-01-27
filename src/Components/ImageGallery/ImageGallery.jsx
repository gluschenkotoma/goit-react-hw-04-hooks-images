import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImagegalleryItem/ImagegalleryItem';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            image={webformatURL}
            largeImageURL={largeImageURL}
            onClickImage={onImageClick}
            tags={tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  id: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
