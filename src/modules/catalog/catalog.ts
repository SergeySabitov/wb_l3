import { Component } from '../component';
import html from './catalog.tpl.html';

import { ProductList } from '../productList/productList';
import { ProductData } from 'types';
import { observeProducts } from '../../utils/helpers';

class Catalog extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  async render() {
    const productsResp = await fetch('/api/getProducts');
    const products: ProductData[] = await productsResp.json();
    this.productList.update(products);
    observeProducts(products)
  }
}

export const catalogComp = new Catalog(html);
