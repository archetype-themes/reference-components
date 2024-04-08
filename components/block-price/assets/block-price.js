import { EVENTS, subscribe } from "@archetype-themes/scripts/utils/pubsub"

class BlockPrice extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.variantChangeUnsubscriber = subscribe(EVENTS.variantChange, (event) => {
      const { html, variant } = event.detail

      if (!variant) {
        this.querySelector("div").innerHTML = "&nbsp;"
        return
      }

      const priceSource = html.querySelector(`block-price[data-section-id="${this.dataset.sectionId}"] div`)

      const priceDestination = this.querySelector("div")

      if (priceSource && priceDestination) {
        priceDestination.outerHTML = priceSource.outerHTML
      }
    })
  }

  disconnectedCallback() {
    this.variantChangeUnsubscriber()
  }
}

customElements.define("block-price", BlockPrice)
