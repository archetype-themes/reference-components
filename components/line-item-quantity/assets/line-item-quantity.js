import { publish } from "@archetype-themes/scripts/utils/pubsub";

export const PUB_SUB_EVENTS = {
  lineItemChange: "line-item:change",
};

export class LineItemQuantity extends HTMLElement {
  connectedCallback() {
    this.addEventListener("change", this.onChange);
  }

  async onChange({ target }) {
    target.setAttribute("disabled", "disabled");

    const responseJson = await this.changeCartQuantity(target.value);

    target.removeAttribute("disabled");

    const html = new DOMParser().parseFromString(
      responseJson.sections["main-cart"],
      "text/html"
    );

    publish(PUB_SUB_EVENTS.lineItemChange, {
      data: {
        html,
        key: this.key,
        quantity: target.value,
      },
    });

    publish("variant:added", {
      data: {
        cart: responseJson,
        item: "items" in responseJson ? responseJson["items"] : [responseJson],
      },
    });
  }

  async changeCartQuantity(newQuantity) {
    const sectionsToBundle = ["main-cart"];
    const response = await fetch(
      `${window.Shopify.routes.root}cart/change.js`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.key,
          quantity: newQuantity,
          sections: sectionsToBundle,
        }),
      }
    );

    return response.json();
  }

  get key() {
    return this.getAttribute("key");
  }
}

if (!customElements.get("line-item-quantity")) {
  customElements.define("line-item-quantity", LineItemQuantity);
}
