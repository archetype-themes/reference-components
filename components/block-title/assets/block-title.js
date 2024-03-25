import { subscribe } from '@archetype-themes/scripts/utils/pubsub';
import { PUB_SUB_EVENTS } from 'components/block-variant-picker';

class BlockTitle extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
      const { html } = event.data;
      const skuDestination = this.querySelector('[data-sku-id]');
      const skuSource = html.querySelector(`block-title[data-section-id="${this.dataset.sectionId}"] [data-sku-id]`);
      if (skuSource && skuDestination) {
        skuDestination.textContent = skuSource.textContent;
      }
    });
  }

  disconnectedCallback() {
    this.variantChangeUnsubscriber?.();
  }
}

customElements.define('block-title', BlockTitle);
