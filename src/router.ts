import { catalogComp } from './modules/catalog/catalog';
import { notFoundComp } from './modules/notFound/notFound';
import { homepageComp } from './modules/homepage/homepage';
import { productDetailComp } from './modules/productDetail/productDetail';
import { checkoutComp } from './modules/checkout/checkout';
import { selectedProducts } from './modules/selectedProducts/selectedProducts';
import { debounce, isItInViewport, sendEvent, viewCardEvent } from './utils/helpers';
import { ProductData } from 'types';

const ROUTES = {
  '/': homepageComp,
  '/catalog': catalogComp,
  '/product': productDetailComp,
  '/checkout': checkoutComp,
  '/favorite': selectedProducts
};

export default class Router {
  $appRoot: HTMLElement;

  constructor() {
    // @ts-ignore
    this.$appRoot = document.querySelector('.js__root');

    window.addEventListener('load', this.route.bind(this));
    window.addEventListener('hashchange', this.route.bind(this));
  }

  route(e: any) {
    e.preventDefault();

    // @ts-ignore
    const component = ROUTES[window.location.pathname] || notFoundComp;
    sendEvent('route', {url: window.location.href});
    if (component?.productList || component?.popularProducts) {
      window.addEventListener('scroll', debounce(() => {
        let products: ProductData[] | null = null;
        if (component.productList) {
          products = component.productList.products;
        }
        if (component.popularProducts) {
          products = component.popularProducts.products;
        }
        if (products) {
          document.querySelectorAll('a.product').forEach(el => {
            if (isItInViewport(el)) {
              const product = products?.find(product => () => {
                const href = el.getAttribute('href');
                if (href) {
                  const elId = new URLSearchParams(href).get('id');
                  if (!elId) return false;
                  return product.id === +elId;
                }          
                return false;   
              });
              
              if (product) viewCardEvent(product)
            }
          });
        }
      }, 500))    
    }
  
    component.attach(this.$appRoot);
    component.render();
  }
}
