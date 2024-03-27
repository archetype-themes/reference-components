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

  set itemCount(newCount) {
    if (this.itemCount === newCount) return;

    if (newCount === 0) {
      this.innerText = newCount;
      this.hidden = true;
    } else if (this.itemCount === 0) {
      this.innerText = newCount;
      this.hidden = false;
    } else {
      this.innerText = newCount;
    }
  }
}

customElements.define("cart-count", CartCount);
