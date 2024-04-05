import {
  PUB_SUB_EVENTS,
  subscribe,
} from "@archetype-themes/scripts/utils/pubsub";

export class CartStatusNotifier extends HTMLElement {
  connectedCallback() {
    this.cartBeforeChangeUnsubscriber = subscribe(
      PUB_SUB_EVENTS.cartBeforeChange,
      () => (this.hidden = true)
    );

    this.cartErrorUnsubscriber = subscribe(
      PUB_SUB_EVENTS.cartError,
      (event) => {
        const { errors } = event.detail;
        this.querySelector("span").innerText = errors;
        this.hidden = false;
      }
    );
  }

  disconnectedCallback() {
    this.cartBeforeChangeUnsubscriber();
    this.cartErrorUnsubscriber();
  }

  set text(text) {
    this.innerText = text;
  }
}

customElements.define("cart-status-notifier", CartStatusNotifier);
