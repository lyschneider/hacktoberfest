import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Loader } from '../components/Loader';
import { UnsplashImage } from '../components/UnsplashImage';
import { WrapperImages } from '../components/WrapperImages';

import '../styles/pages/landing.css';

function Landing() {
  const [images, setImage] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [])

  const fetchImages = (count = 100) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESSKEY;

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then(res => {
        setImage([ ...images, ...res.data ]);
      })
  }

  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <header>
          <h1><strong>Art Gallery</strong></h1>
        </header>

        <InfiniteScroll
            dataLength={images.length} //This is important field to render the next data
            next={fetchImages}
            hasMore={true}
            loader={<Loader />}
            className="flex flex-wrap"
          >
            <WrapperImages>
              {images.map(image => (
                <UnsplashImage url={image.urls.thumb} key={image.id} />
              ))}
            </WrapperImages>
          </InfiniteScroll>
      </div>
    </div>
  );
}

export default Landing;