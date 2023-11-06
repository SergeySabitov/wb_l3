import { Component } from '../component';
import html from './catalog.tpl.html';

import { ProductList } from '../productList/productList';
import { SearchTips } from '../searchTips/searchTips';

class Catalog extends Component {
  productList: ProductList;
  searchTips: SearchTips;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);

    this.searchTips = new SearchTips();
    this.searchTips.attach(this.view.tips);
  }

  async render() {
    const productsResp = await fetch('/api/getProducts');
    const products = await productsResp.json();
    this.productList.update(products);

    // логика должна будет перейти в компонент SearchBar
    const tips = ['чехол iphone 13 pro', 'коляска agex', 'яндекс станция 2'] // fetch
    setTimeout(() => this.searchTips.update(tips), 2000);
  }
}

export const catalogComp = new Catalog(html);
