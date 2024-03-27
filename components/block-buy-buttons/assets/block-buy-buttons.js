import { publish, subscribe } from "@archetype-themes/scripts/utils/pubsub";
import { PUB_SUB_EVENTS as VARIANT_PICKER_PUB_SUB_EVENTS } from "components/block-variant-picker";

export const PUB_SUB_EVENTS = {
  variantAdded: "variant:added",
};

class BlockBuyButtons extends HTMLElement {
  connectedCallback() {
    this.variantChangeUnsubscriber = subscribe(
      VARIANT_PICKER_PUB_SUB_EVENTS.variantChange,
      ({ data: { html, variant } }) => {
        if (!variant) {
          this.setUnavailable();
          return;
        }

        this.updateVariantInput(variant);
        this.renderProductInfo(html);
      }
    );

    this.addEventListener("submit", this.onButtonSubmit);
  }

  disconnectedCallback() {
    this.variantChangeUnsubscriber?.();
  }

  renderProductInfo(html) {
    const addButtonUpdated = html.getElementById(
      `ProductSubmitButton-${this.dataset.sectionId}`
    );

    if (addButtonUpdated) {
      this.toggleAddButton(
        addButtonUpdated.hasAttribute("disabled"),
        this.getLocales().soldOut
      );
    }
  }

  getLocales() {
    this.locales =
      this.locales ||
      JSON.parse(this.querySelector('[type="application/json"]').textContent);

    return this.locales;
  }

  toggleAddButton(disable = true, text) {
    const productForm = document.getElementById(
      `product-form-${this.dataset.sectionId}`
    );

    if (!productForm) return;

    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');

    if (!addButton) return;

    if (disable) {
      addButton.setAttribute("disabled", "disabled");
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute("disabled");
      addButtonText.textContent = this.getLocales().addToCart;
    }
  }

  setUnavailable() {
    const button = document.getElementById(
      `product-form-${this.dataset.sectionId}`
    );
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');

    if (!addButton) return;
    addButtonText.textContent = this.getLocales().unavailable;
  }

  updateVariantInput(variant) {
    const productForms = document.querySelectorAll(
      `#product-form-${this.dataset.sectionId}, #product-form-installment-${this.dataset.sectionId}`
    );

    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = variant.id;

      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  async onButtonSubmit(event) {
    event.preventDefault();

    this.disableAddToCartButton();

    try {
      // TODO: determine if we want to fetch sections when adding to cart
      const responseJson = await this.addVariantToCart();
      const cart = await this.fetchCart();

      this.publishCartUpdate(cart, responseJson);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      this.enableAddToCartButton();
    }
  }

  async addVariantToCart() {
    const sectionToBundle = [];
    const formData = this.getFormDataWithSections(sectionToBundle);

    const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
      method: "POST",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  }

  async fetchCart() {
    return (await fetch(`${window.Shopify.routes.root}cart.js`)).json();
  }

  publishCartUpdate(cart, responseJson) {
    publish(PUB_SUB_EVENTS.variantAdded, {
      data: {
        cart,
        item: "items" in responseJson ? responseJson["items"] : [responseJson],
      },
    });
  }

  getFormDataWithSections(sections) {
    const productForm = this.querySelector(
      `#product-form-${this.dataset.sectionId}`
    );

    const formData = new FormData(productForm);

    formData.set("sections", sections.join(","));
    formData.set(
      "sections_url",
      `${window.Shopify.routes.root}variants/${productForm.id.value}`
    );

    return formData;
  }

  enableAddToCartButton() {
    const productForm = document.getElementById(
      `product-form-${this.dataset.sectionId}`
    );

    if (!productForm) return;

    const addButton = productForm.querySelector('[name="add"]');
    addButton.removeAttribute("disabled");
    addButton.removeAttribute("aria-busy");
  }

  disableAddToCartButton() {
    const productForm = document.getElementById(
      `product-form-${this.dataset.sectionId}`
    );

    if (!productForm) return;

    const addButton = productForm.querySelector('[name="add"]');
    addButton.setAttribute("disabled", "");
    addButton.setAttribute("aria-busy", "true");
  }
}

customElements.define("block-buy-buttons", BlockBuyButtons);
