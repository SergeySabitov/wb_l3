import { ProductData } from "types";

export const genUUID = () => {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

export const addElement = (parent: HTMLElement, tag: string, options?: object) => {
  const element = document.createElement(tag) as HTMLElement;

  if (options) Object.assign(element, options);

  parent.appendChild(element);

  return element;
};

export const formatPrice = (price: number) => {
  return (
    Math.round(price / 1000)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽'
  );
};

export const sendEvent = (eventType: string, payload: any): Promise<boolean> => {
  const event = {
    type: eventType,
    payload: payload,
    timestamp: Date.now()
  };

  return fetch('/api/sendEvent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })
    .then(response => response.ok)
    .catch(() => false);
};

export const isItInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const verticalInView = rect.top <= windowHeight && rect.bottom >= 0;
  const horizontalInView = rect.left <= windowWidth && rect.right >= 0;

  return verticalInView && horizontalInView;
};

export const viewCardEvent = (product: ProductData) => {
  const { log, ...payload } = product;
  const eventType = log ? 'viewCardPromo' : 'viewCard';

  fetch(`/api/getProductSecretKey?id=${product.id}`)
  .then((res) => res.json())
  .then((secretKey) => {
    sendEvent(eventType, { ...payload, secretKey })
    .then(success => {
      if (success) {
        console.log('Event sent successfully.');
      } else {
        console.log('Failed to send event.');
      }
    });
  });
};

export function debounce<T extends (...args: any[]) => void>(func: T, ms: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function(this: any, ...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), ms);
  };
}