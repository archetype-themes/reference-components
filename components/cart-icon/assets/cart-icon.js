import {
  PUB_SUB_EVENTS,
  subscribe,
} from "@archetype-themes/scripts/utils/pubsub";

class CartCount extends HTMLElement {
  connectedCallback() {
    this.cartChangeUnsubscriber = subscribe(
      PUB_SUB_EVENTS.cartChange,
      (event) => {
        const { cart } = event.detail;
        this.itemCount = cart.item_count;
      }
    );
  }

  disconnectedCallback() {
    this.cartChangeUnsubscriber();
  }

  get itemCount() {
    return parseInt(this.innerText);
  }

  set itemCount(count) {
    if (this.itemCount === count) return;

    this.innerText = count.toString();
    this.hidden = count === 0;
  }
}

customElements.define("cart-count", CartCount);
