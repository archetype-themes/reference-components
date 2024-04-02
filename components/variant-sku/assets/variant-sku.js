import { subscribe } from '@archetype-themes/scripts/utils/pubsub';
import { PUB_SUB_EVENTS } from 'components/block-variant-picker';

class VariantSku extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
      const { html, sectionId, variant } = event.data;
      if (!variant) {
        this.textContent = '';
        return;
      }
      const skuSource = html.querySelector(`[data-section-id="${sectionId}"] variant-sku`);
      if (skuSource) {
        this.textContent = skuSource.textContent;
      }
    });
  }

  disconnectedCallback() {
    this.variantChangeUnsubscriber?.();
  }
}

customElements.define('variant-sku', VariantSku);
