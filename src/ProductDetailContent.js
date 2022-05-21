import React from 'react';
import { CardContent, IconButton } from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import { get } from 'lodash';

const ProductDetailContent = React.memo(({ data, isMobile, onAddToCart }) => {
  const specs = get(data, 'specs', []);
  return (
    <CardContent className='rpa-product-detail-content'>
      <div className='rpa-product-detail-content-header'>
        <div
          style={{
            textTransform: 'uppercase',
            fontSize: '22px',
            fontWeight: 'bold',
            paddingRight: '20px',
          }}
        >
          {data.name}
        </div>
        <IconButton size='large' color='primary' onClick={() => onAddToCart(data)}>
          <AddShoppingCartIcon />
        </IconButton>
      </div>
      <div className='rpa-product-detail-content-image rpa-section'>
        <img alt={data.name} src={data.image} height={260} />
      </div>
      {specs.length > 0 && (
        <div className='rpa-product-detail-content-specs rpa-section'>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
            Specifications
          </div>
          <div
            className='rpa-product-detail-content-specs-items'
            style={{ margin: isMobile ? 'initial' : '0 30px' }}
          >
            {specs.map((spec, index) => (
              <div key={index} className='rpa-product-detail-content-specs-item'>
                <div style={{ fontSize: '20px' }}>{spec.value}</div>
                <div style={{ marginTop: '15px', fontSize: '14px' }}>{spec.property}</div>
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
