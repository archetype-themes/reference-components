import { subscribe } from "@archetype-themes/scripts/utils/pubsub";
import { PUB_SUB_EVENTS as LINE_ITEM_QUANTITY_PUB_SUB_EVENTS } from "components/line-item-quantity";

export class LineItemPrice extends HTMLElement {
  connectedCallback() {
    this.cartChangeUnsubscriber = subscribe(
      LINE_ITEM_QUANTITY_PUB_SUB_EVENTS.lineItemChange,
      this.handleLineItemChange.bind(this)
    );
  }

  disconnectedCallback() {
    this.cartChangeUnsubscriber?.();
  }

  handleLineItemChange({ data }) {
    const { html, key } = data;

    if (key !== this.key) return;

    const price = html.querySelector(
      `line-item-price[key="${this.key}"]`
    ).innerText;

    this.price = price;
  }

  get key() {
    return this.getAttribute("key");
  }

  set price(count) {
    this.innerText = count;
  }
}

if (!customElements.get("line-item-price")) {
  customElements.define("line-item-price", LineItemPrice);
}
