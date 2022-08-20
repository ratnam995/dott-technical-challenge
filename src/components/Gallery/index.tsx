import React, { ForwardedRef, useRef } from 'react';

import { useInfiniteScroll, useLazyLoading } from '../../shared/custom-hooks'
import './gallery.component.css';

interface iGalleryPropTypes {
  fullList: Array<string>
}

const Gallery = React.forwardRef((props: iGalleryPropTypes, ref: ForwardedRef<HTMLDivElement>) => {
  const { fullList } = props;
  const triggerRef = useRef(null);
  const { data, loading } = useInfiniteScroll({ triggerRef, fullList });

  useLazyLoading('.card-img-top', data);
  
  return (
    <div className="container" ref={ref}>
      <div className="row">
        {data.map((image: string, index: number) => {
          return (
            <div key={index} className="card">
              <img
                alt={`image-${index}`}
                data-src={image}
                className="card-img-top"
              />
            </div>
          )
        })}
      </div>
      <div ref={triggerRef}>
        {
          loading && (
            <div className="loading-message">
              <p>Getting images</p>
            </div>
          )
        }
      </div>
    </div>
  );
});

export default Gallery;