import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ galleryItems, onClick }) => {
  return (
    <>
      {galleryItems.map(({ id, webformatURL, largeImageURL }) => (
        <li
          key={id}
          className="ImageGalleryItem"
          onClick={() => onClick(largeImageURL)}
        >
          <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propType = {
  galleryItems: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGalleryItem;
