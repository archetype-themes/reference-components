import { updateCart } from "@archetype-themes/utils/theme-request"

export class CartNote extends HTMLElement {
  connectedCallback() {
    this.addEventListener("change", this.onChange)
  }

  async onChange({ target }) {
    if (target.getAttribute("name") !== "note") return
    await updateCart({ note: target.value })
  }
}

customElements.define("cart-note", CartNote)
