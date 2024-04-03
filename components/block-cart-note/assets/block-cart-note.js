import { updateCart } from "@archetype-themes/scripts/utils/theme-request";

export class CartNote extends HTMLElement {
  connectedCallback() {
    this.controller = new AbortController();

    this.addEventListener("change", this.onChange.bind(this), {
      signal: this.controller.signal,
    });
  }

  disconnectedCallback() {
    this.controller.abort();
  }

  async onChange({ target }) {
    if (target.getAttribute("name") !== "note") return;
    await updateCart({ note: target.value });
  }
}

if (!customElements.get("cart-note")) {
  customElements.define("cart-note", CartNote);
}
