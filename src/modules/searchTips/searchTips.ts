import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTips.tpl.html';
import { SearchTip } from 'types';


export class SearchTips {
  view: View;
  tips: SearchTip[];

  constructor() {
    this.tips = [];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(tips: SearchTip[]) {
    this.tips = tips;
    this.render();
  }

  render() {
    if (this.view.querySelectorAll) {
        const tipElements = this.view.querySelectorAll('.tips__tip__text')
        if (this.tips.length >= tipElements.length) {
            this.view.querySelectorAll('.tips__tip').forEach(el => el.classList.remove('loading'))
            tipElements.forEach((el, index) => {
                el.innerHTML = this.tips[index].text;
                el.addEventListener('click', () => {
                  let newUrl = new URL(window.location.href);
                  newUrl.pathname = this.tips[index].link ? this.tips[index].link : '/';
                  window.location.replace(newUrl);
                })
            })
        }
    }
  }
}
