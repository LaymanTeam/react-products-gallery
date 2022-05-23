# react-products-gallery
This library allows developers to easily integrate online shopping component into their React applications. It uses Rollup as a bundler and Material-UI for rendering major parts of its UI.

See this component in [action](https://productsgallery.netlify.com/).

## Installation
```shell
npm install react-products-gallery
```

## Usage
```js
import ProductsGallery from 'react-products-gallery'

const products = [
  {
    id: 1,
    name: 'Antarctic Star Space Heater',
    currency: '$',
    price: 16.7,
    image: 'https://m.media-amazon.com/images/I/random-product-image-167.jpg',
    specs: [
      { property: 'Color', value: 'Black' },
      { property: 'Power Source', value: 'Corded Electric' },
      //...
    ],
    description: 'Lorem ipsum dolor sit amet',
  },
  //...
];

// ...
render() {
  return(
    <ProductsGallery
      products={products}
      callbacks={{ onAddToCart: (product) => {} }}
      options={{ mobileWidth: 600 }}
    />
  )
}
```
## Component Props
|Name               |Type           |Description
|-------------------|---------------|------------------------------------------------------
|products           |`array`        |Check out the payload example from above. `image`, `specs`, and `description` are optional
|options            |`object`       |Check out the list of available [options](#options) from the table below
|callbacks          |`object`       |Check out the list of available [callbacks](#callbacks) from the table below

#### Options
|Name                   |Type           |Default        |Description
|-----------------------|---------------|---------------|------------------------------------------------------
|wrapperStyles          |`object`       |`{}`           |Inline style object for the top-level wrapper element
|autoSelectProduct      |`boolean`      |`true`         |If `true`, the first product will be selected by default upon data load and search.
|searchInputAutoFocus   |`boolean`      |`false`        |If `true`, search field will be focused by default upon initialization of the component.
|searchInputPlaceholder |`string`       |`"Find the product of your dreams"` |Placeholder text for the search field.
|mobileWidth            |`number`       |768            |The boundary width of the component (in pixels) where it turns into mobile-friendly UI.
|debounceDelay          |`number`       |350            |The debounce delay of the search result (in milliseconds) to become effective.

#### Callbacks
|Name                   |Type           |Parameters           |Description
|-----------------------|---------------|---------------------|-----------------------------------------------------------
|onSelectProduct        |`function`     |`(product: object)`  |Fired when a product is selected from the left-hand list
|onUpdateSearch         |`function`     |`(keyword: string)`  |Fired when the search keyword is changed. (Debounced)
|onClearSearch          |`function`     |None                 |Fired when the clear button of search field is clicked.
|onAddToCart            |`function`     |`(product: object)`  |Fired when the cart button of the product detail section is clicked.
