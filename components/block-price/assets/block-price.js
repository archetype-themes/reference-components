import { EVENTS, subscribe } from '@archetype-themes/utils/pubsub'

class BlockPrice extends HTMLElement {
  connectedCallback() {
    this.variantChangeUnsubscriber = subscribe(EVENTS.variantChange, this.handleVariantChange.bind(this))
  }

  disconnectedCallback() {
    this.variantChangeUnsubscriber()
  }

  handleVariantChange({ detail }) {
    const { html, variant } = detail

    if (!variant) {
      this.querySelector('div').innerHTML = '&nbsp;'
      return
    }

    const priceSource = html.querySelector(`block-price[data-section-id="${this.dataset.sectionId}"] div`)
    const priceDestination = this.querySelector('div')

    if (priceSource && priceDestination) {
      priceDestination.outerHTML = priceSource.outerHTML
    }
  }
}

customElements.define('block-price', BlockPrice)
