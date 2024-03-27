import { subscribe } from "@archetype-themes/scripts/utils/pubsub";
import { PUB_SUB_EVENTS as BUY_BUTTON_PUB_SUB_EVENTS } from "components/block-buy-buttons";

class CartCount extends HTMLElement {
  connectedCallback() {
    this.variantAddedToCartUnsubscriber = subscribe(
      BUY_BUTTON_PUB_SUB_EVENTS.variantAdded,
      (event) => {
        const { cart } = event.data;
        this.itemCount = cart.quantity;
      }
    );
  }

  disconnectedCallback() {
    this.variantAddedToCartUnsubscriber?.();
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
