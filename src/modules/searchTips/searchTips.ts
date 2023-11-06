import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTips.tpl.html';


export class SearchTips {
  view: View;
  tips: string[];

  constructor() {
    this.tips = [];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(tips: string[]) {
    this.tips = tips;
    this.render();
  }

  render() {
    if (this.view.querySelectorAll) {
        const tipElements = this.view.querySelectorAll('.tips__tip__text')
        if (this.tips.length >= tipElements.length) {
            this.view.querySelectorAll('.tips__tip').forEach(el => el.classList.remove('loading'))
            tipElements.forEach((el, index) => {
                el.innerHTML = this.tips[index]
            })
        }
    }
  }
}
