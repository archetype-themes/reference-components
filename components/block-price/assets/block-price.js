import { subscribe } from '@archetype-themes/scripts/utils/pubsub';
import { PUB_SUB_EVENTS } from 'components/block-variant-picker';

class BlockPrice extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
      const { html } = event.data;
      const skuSource = html.querySelector(`block-price[data-section-id="${this.dataset.sectionId}"]`);
      if (skuSource) {
        this.innerHTML = skuSource.innerHTML;
      }
    });
  }

  disconnectedCallback() {
    this.variantChangeUnsubscriber?.();
  }
}

customElements.define('block-price', BlockPrice);
