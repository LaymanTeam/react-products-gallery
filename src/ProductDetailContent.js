import React from 'react';
import { CardContent, IconButton } from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import { get } from 'lodash';

const ProductDetailContent = React.memo(({ data, isMobile, onAddToCart }) => {
  const specs = get(data, 'specs', []);
  return (
    <CardContent className='rpa-product-detail-content'>
      <div className='rpa-product-detail-content-header'>
        <div className='rpa-product-name'>{data.name}</div>
        <IconButton size='large' color='primary' onClick={() => onAddToCart(data)}>
          <AddShoppingCartIcon />
        </IconButton>
      </div>
      <div className='rpa-product-detail-content-image rpa-section'>
        <img alt={data.name} src={data.image} height={260} />
      </div>
      {specs.length > 0 && (
        <div className='rpa-product-detail-content-specs rpa-section'>
          <div className='rpa-card-subtitle'>Specifications</div>
          <div
            className='rpa-product-detail-content-specs-items'
            style={{ margin: isMobile ? 'initial' : '0 30px' }}
          >
            {specs.map((spec, index) => (
              <div key={index} className='rpa-product-detail-content-specs-item'>
                <div className='rpa-spec-value'>{spec.value}</div>
                <div className='rpa-spec-property'>{spec.property}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div
        className='rpa-product-detail-content-description rpa-section'
        style={{ margin: isMobile ? 'initial' : '0 45px' }}
      >
        {data.description}
      </div>
    </CardContent>
  );
});

export default ProductDetailContent;
