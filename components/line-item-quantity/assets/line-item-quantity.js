import { publish } from "@archetype-themes/scripts/utils/pubsub";
import { PUB_SUB_EVENTS } from "@archetype-themes/scripts/utils/pubsub";

export class LineItemQuantity extends HTMLElement {
  connectedCallback() {
    this.addEventListener("change", this.onChange);
  }

  async onChange({ target }) {
    target.setAttribute("disabled", "disabled");

    const responseJson = await this.changeCartQuantity(target.value);

    target.removeAttribute("disabled");

    const html = new DOMParser().parseFromString(
      responseJson?.sections[this.sectionId],
      "text/html"
    );

    publish(PUB_SUB_EVENTS.lineItemChange, {
      data: {
        html,
        index: this.index,
        quantity: target.value,
      },
    });

    publish(PUB_SUB_EVENTS.cartChange, {
      data: {
        cart: responseJson,
        item: "items" in responseJson ? responseJson["items"] : [responseJson],
      },
    });
  }

  async changeCartQuantity(quantity) {
    const sectionsToBundle = [this.sectionId];
    const response = await fetch(`${window.Shopify.routes.root}cart/change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        line: this.index,
        quantity,
        sections: sectionsToBundle,
      }),
    });

    return response.json();
  }

  get index() {
    return this.getAttribute("index");
  }

  get sectionId() {
    return this.getAttribute("section-id");
  }
}

customElements.define("line-item-quantity", LineItemQuantity);
