import { subscribe } from "@archetype-themes/scripts/utils/pubsub";
import { PUB_SUB_EVENTS } from "@archetype-themes/scripts/utils/pubsub";

export class LineItemPrice extends HTMLElement {
  connectedCallback() {
    this.cartChangeUnsubscriber = subscribe(
      PUB_SUB_EVENTS.lineItemChange,
      this.handleLineItemChange.bind(this)
    );
  }

  disconnectedCallback() {
    this.cartChangeUnsubscriber();
  }

  handleLineItemChange({ detail }) {
    const { html, index } = detail;

    if (index !== this.index) return;

    const price = html.querySelector(
      `line-item-price[index="${this.index}"]`
    ).innerText;

    this.price = price;
  }

  get index() {
    return this.getAttribute("index");
  }

  set price(count) {
    this.innerText = count;
  }
}

customElements.define("line-item-price", LineItemPrice);
