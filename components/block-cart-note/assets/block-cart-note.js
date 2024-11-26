import { HTMLSectionElement } from '@archetype-themes/custom-elements/section'

export class CartNote extends HTMLSectionElement {
  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('change', this.handleChange.bind(this))
  }

  onBlockSelect() {
    this.style.outline = '2px solid coral'
  }

  onBlockDeselect() {
    this.style.outline = 'none'
  }

  async handleChange({ target }) {
    if (target.getAttribute('name') !== 'note') return

    await this.updateCart({ note: target.value })
  }

  async updateCart(body) {
    const response = await fetch(`${Shopify.routes.root}cart/update.js`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true
    })

    if (!response.ok) {
      console.error('Failed to update cart')
    }

    return response
  }
}

customElements.define('cart-note', CartNote)
