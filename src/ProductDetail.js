import React from 'react';
import { Card } from '@mui/material';

import ProductDetailContent from './ProductDetailContent';

const ProductDetail = (props) => {
  if (!props.data) return null;
  return (
    <Card>
      <ProductDetailContent {...props} />
    </Card>
  );
};

export default ProductDetail;
