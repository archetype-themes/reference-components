import { subscribe } from "@archetype-themes/scripts/utils/pubsub";
import { PUB_SUB_EVENTS } from "@archetype-themes/scripts/utils/pubsub";

export class CartTotalPrice extends HTMLElement {
  connectedCallback() {
    this.cartChangeUnsubscriber = subscribe(
      PUB_SUB_EVENTS.lineItemChange,
      this.handleLineItemChange.bind(this)
    );
  }

  disconnectedCallback() {
    this.cartChangeUnsubscriber?.();
  }

  handleLineItemChange({ data }) {
    const { html } = data;
    const price = html.querySelector("cart-total-price")?.innerText;

    this.price = price || this.price;
  }

  set price(count) {
    this.innerText = count;
  }
}

customElements.define("cart-total-price", CartTotalPrice);
