// import { Component } from 'react';
import { useState, useEffect } from 'react';
import api from '../services/api';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import '../styles.css';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [searchImage, setSearchImage] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (searchImage === '') {
      return;
    }

    api(searchImage, page)
      .then(data => {
        setGallery(prevState => [...prevState, ...data.hits]);
        setLoading(false);
      })

      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [searchImage, page]);

  const onSubmit = searchImage => {
    setGallery([]);
    setSearchImage(searchImage);
    setLoading(true);
  };

  const onLoadMoreBtn = () => {
    setPage(prevState => prevState + 1);
    setLoading(true);
  };

  const isShowModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onClickGalleryImage = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      {loading && <Loader />}
      <ImageGallery>
        <ImageGalleryItem
          galleryItems={gallery}
          onClick={onClickGalleryImage}
          url={largeImageURL}
        />
      </ImageGallery>
      {gallery.length > 0 && <Button onClick={onLoadMoreBtn} />}
      {showModal && <Modal onClose={isShowModal} url={largeImageURL} />}
    </div>
  );
};
