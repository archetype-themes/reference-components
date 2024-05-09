import { EVENTS, subscribe } from '@archetype-themes/utils/pubsub'

export class ProductMediaGallery extends HTMLElement {
  connectedCallback() {
    this.variantChangeUnsubscriber = subscribe(EVENTS.variantChange, this.handleVariantChange.bind(this))
  }

  disconnectedCallback() {
    this.variantChangeUnsubscriber()
  }

  handleVariantChange({ detail }) {
    const { sectionId, variant } = detail

    if (!variant || !variant.featured_media) {
      return
    }

    const mediaContainer = this.querySelector(`[data-section-id="${sectionId}"][data-media-id="${variant.featured_media.id}"]`)

    if (!mediaContainer) {
      return
    }

    if (window.matchMedia('screen and (max-width: 769px)').matches) {
      this.scrollTo({ left: mediaContainer.offsetLeft - (this.offsetWidth - mediaContainer.offsetWidth) / 2, behavior: 'smooth' })
    } else {
      window.scroll({
        top: mediaContainer.offsetTop,
        behavior: 'smooth'
      })
    }
  }
}

customElements.define('product-media-gallery', ProductMediaGallery)
