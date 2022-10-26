import { Component } from 'react';
import api from '../services/api';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import '../styles.css';

export class App extends Component {
  state = {
    gallery: [],
    searchImage: '',
    page: 1,
    perPage: 12,
    loading: false,
    error: null,
    largeImageURL: null,
    total: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchImage !== this.state.searchImage
    ) {
      api(this.state.searchImage, this.state.perPage, this.state.page)
        .then(data =>
          this.setState(prevState => {
            return { gallery: [...prevState.gallery, ...data.hits] };
          })
        )
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onSubmit = searchImage => {
    this.setState({
      gallery: [],
      searchImage,
      loading: true,
    });
  };

  onLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  showModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickGalleryImage = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.loading && <Loader />}
        <ImageGallery>
          <ImageGalleryItem
            galleryItems={this.state.gallery}
            onClick={this.onClickGalleryImage}
            url={this.state.largeImageURL}
          />
        </ImageGallery>
        {this.state.gallery.length > 0 && (
          <Button onClick={this.onLoadMoreBtn} />
        )}
        {this.state.showModal && (
          <Modal onClose={this.showModal} url={this.state.largeImageURL} />
        )}
      </div>
    );
  }
}
