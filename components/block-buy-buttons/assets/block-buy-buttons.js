import { subscribe } from '@archetype-themes/scripts/utils/pubsub';
import { PUB_SUB_EVENTS } from 'components/block-variant-picker';

class BlockBuyButtons extends HTMLElement {
  constructor() {
    super();
    this.getLocales();
  }

  connectedCallback() {
    this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
      this.sectionId = event.data.sectionId;
      if (!event.data.currentVariant) {
        this.setUnavailable();
      }
      this.renderProductInfo(event.data);
    });
  }

  renderProductInfo(data) {
    const addButtonUpdated = data.html.getElementById(`ProductSubmitButton-${this.sectionId}`);
    this.toggleAddButton(
      addButtonUpdated ? addButtonUpdated.hasAttribute('disabled') : true,
      this.getLocales().soldOut
    );
  }

  getLocales() {
    return this.locales ||= JSON.parse(this.querySelector('[type="application/json"][data-locales-json]').textContent);
  }

  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.sectionId}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = this.getLocales().addToCart;
    }

    if (!modifyClass) return;
  }

  setUnavailable() {
    const button = document.getElementById(`product-form-${this.sectionId}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.sectionId}`);
    const inventory = document.getElementById(`Inventory-${this.sectionId}`);
    const sku = document.getElementById(`Sku-${this.sectionId}`);

    if (!addButton) return;
    addButtonText.textContent = this.locales.unavailable;
    if (price) price.classList.add('visibility-hidden');
    if (inventory) inventory.classList.add('visibility-hidden');
    if (sku) sku.classList.add('visibility-hidden');
  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(
      `#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`
    );
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
}


customElements.define('block-buy-buttons', BlockBuyButtons);
