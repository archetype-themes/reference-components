import { EVENTS, subscribe } from "@archetype-themes/utils/pubsub"

class VariantSku extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.variantChangeUnsubscriber = subscribe(EVENTS.variantChange, (event) => {
      const { html, sectionId, variant } = event.detail

      if (!variant) {
        this.textContent = ""
        return
      }

      const skuSource = html.querySelector(`[data-section-id="${sectionId}"] variant-sku`)

      if (skuSource) {
        this.textContent = skuSource.textContent
      }
    })
  }

  disconnectedCallback() {
    this.variantChangeUnsubscriber?.()
  }
}

customElements.define("variant-sku", VariantSku)
