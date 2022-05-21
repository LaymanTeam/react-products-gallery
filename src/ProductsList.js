import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardActionArea, Collapse } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { omit, isEqual } from 'lodash';

import ProductDetailContent from './ProductDetailContent';

const ProductCard = ({ product, isMobile, isSelected, onSelectCard, onAddToCart }) => {
  const iconStyle = {};
  if (isMobile) iconStyle.transform = isSelected ? 'rotate(270deg)' : 'rotate(90deg)';
  return (
    <Card
      className='rpa-product-card'
      sx={{
        marginBottom: '15px',
        outline: isSelected ? '2px solid #1976d2' : 'none',
      }}
    >
      <CardActionArea onClick={onSelectCard}>
        <CardContent
          className='rpa-product-card-content'
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '15px 5px 15px 15px',
            '&:last-child': {
              paddingBottom: '15px',
            },
          }}
        >
          <div className='rpa-product-card-info'>
            <div className='rpa-product-name'>{product.name}</div>
            <div className='rpa-label'>Price</div>
            <div className='rpa-price'>{`${product.currency}${product.price}`}</div>
          </div>
          <ChevronRightIcon sx={iconStyle} />
        </CardContent>
      </CardActionArea>
      {isMobile && (
        <Collapse in={isSelected} timeout='auto' unmountOnExit>
          <ProductDetailContent data={product} isMobile={isMobile} onAddToCart={onAddToCart} />
        </Collapse>
      )}
    </Card>
  );
};

const ProductsList = ({ products, autoSelectProduct, isMobile, onSelect, onAddToCart }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    onSelectCard(autoSelectProduct ? 0 : -1);
  }, [products, autoSelectProduct]);

  const onSelectCard = (index) => {
    if (index < 0 || (isMobile && index === selectedIndex)) {
      onSelect(null);
      setSelectedIndex(-1);
    } else {
      onSelect(products[index]);
      setSelectedIndex(index);
    }
  };

  const productWidgets = useMemo(() => {
    return products.map((product, index) => (
      <ProductCard
        key={index}
        product={product}
        isMobile={isMobile}
        isSelected={index === selectedIndex}
        onSelectCard={() => onSelectCard(index)}
        onAddToCart={onAddToCart}
      />
    ));
  }, [products, isMobile, selectedIndex]);

  return productWidgets;
};

export default React.memo(ProductsList, (prevProps, nextProps) => {
  if (
    isEqual(
      omit(prevProps, ['onSelect', 'onAddToCart']),
      omit(nextProps, ['onSelect', 'onAddToCart']),
    )
  )
    return true;
  return false;
});
