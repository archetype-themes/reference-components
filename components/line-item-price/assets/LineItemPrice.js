import { subscribe } from "@archetype-themes/scripts/utils/pubsub";
import { PUB_SUB_EVENTS as LINE_ITEM_QUANTITY_PUB_SUB_EVENTS } from "components/line-item-quantity";

export class LineItemPrice extends HTMLElement {
  connectedCallback() {
    this.cartChangeUnsubscriber = subscribe(
      LINE_ITEM_QUANTITY_PUB_SUB_EVENTS.lineItemChange,
      (event) => {
        const { cart, key } = event.data;
        if (key !== this.key) return;
        // get sections data from main-cart
        console.log(cart);
        // parse the HTML
        // query the selector that has a key attribute that matches key
        // set the price to the innerText of that element
        this.price = "SOMETHING";
      }
    );
  }

  disconnectedCallback() {
    this.cartChangeUnsubscriber?.();
  }

  get key() {
    return this.getAttribute("key");
  }

  set price(count) {
    this.innerText = count;
  }
}
