import PropTypes from 'prop-types';

import defaultImage from './default-image.jpg';

export const ImageGalleryItem = ({
  image,
  tags,
  onClickImage,
  largeImageURL,
}) => {
  return (
    <li>
      <img src={image} alt={tags} onClick={() => onClickImage(largeImageURL)} />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  tags: 'Foto',
  webformatURL: defaultImage,
  largeImageURL: defaultImage,
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
