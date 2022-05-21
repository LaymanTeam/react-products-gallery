import React, { useRef, useEffect, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useResizeDetector } from 'react-resize-detector';
import { get } from 'lodash';

import ProductSearchInput from './ProductSearchInput';
import ProductsList from './ProductsList';
import ProductDetail from './ProductDetail';
import './index.css';

const defaultOptions = {
  wrapperStyles: {},
  autoSelectProduct: true,
  searchInputAutoFocus: false,
  searchInputPlaceholder: 'Find the product of your dreams',
};

const defaultCallbacks = {
  onSelectProduct: (product) => {},
  onUpdateSearch: (keyword) => {},
  onClearSearch: () => {},
  onAddToCart: (product) => {},
};

const SM_SCREEN_WIDTH = 768;

const ProductsGallery = ({
  products = [],
  options = defaultOptions,
  callbacks = defaultCallbacks,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeProduct, setActiveProduct] = useState(null);

  const wrapperRef = useRef();
  const { width } = useResizeDetector({ targetRef: wrapperRef });
  const [isMobile, setIsMobile] = useState(width <= SM_SCREEN_WIDTH);

  const globalMuiTheme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
    },
    components: {
      MuiCard: {
        defaultProps: {
          elevation: 2,
        },
      },
    },
  });

  useEffect(() => {
    setIsMobile(width <= SM_SCREEN_WIDTH);
  }, [width]);

  const onChangeKeyword = (name) => {
    setSearchKeyword(name);
    if (callbacks.onUpdateSearch) callbacks.onUpdateSearch(name);
  };

  const onSelectProduct = (product) => {
    if (callbacks.onSelectProduct) callbacks.onSelectProduct(product);
    setActiveProduct(product);
  };

  const filteredProducts = useMemo(
    () => products.filter((p) => p.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1),
    [products, searchKeyword],
  );

  const getProductsContent = () => {
    if (products.length === 0) {
      return <div className='rpa-products-message'>There are no items here</div>;
    } else if (filteredProducts.length === 0) {
      return <div className='rpa-products-message'>No items match your search</div>;
    }
    return (
      <>
        <div
          className='rpa-products-list'
          style={{ maxWidth: isMobile ? 'initial' : '400px', width: isMobile ? '100%' : '30%' }}
        >
          <ProductsList
            products={filteredProducts}
            autoSelectProduct={get(options, 'autoSelectProduct', defaultOptions.autoSelectProduct)}
            isMobile={isMobile}
            onSelect={onSelectProduct}
            onAddToCart={callbacks.onAddToCart}
          />
        </div>
        {!isMobile && (
          <div className='rpa-product-detail'>
            <ProductDetail
              data={activeProduct}
              isMobile={isMobile}
              onAddToCart={callbacks.onAddToCart}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <ThemeProvider theme={globalMuiTheme}>
      <div
        className='rpa-wrapper'
        ref={wrapperRef}
        style={{ visibility: width ? 'visible' : 'hidden' }}
      >
        <div className='rpa-search-input-wrapper'>
          <ProductSearchInput
            keyword={searchKeyword}
            autoFocus={get(options, 'searchInputAutoFocus', defaultOptions.searchInputAutoFocus)}
            placeholder={get(
              options,
              'searchInputPlaceholder',
              defaultOptions.searchInputPlaceholder,
            )}
            onChangeKeyword={onChangeKeyword}
            onClearKeyword={callbacks.onClearSearch}
          />
        </div>
        <div className='rpa-products'>{getProductsContent()}</div>
      </div>
    </ThemeProvider>
  );
};

export default ProductsGallery;
