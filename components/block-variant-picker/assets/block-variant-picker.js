import { EVENTS, publish } from "@archetype-themes/scripts/utils/pubsub";

class BlockVariantPicker extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("change", this.onVariantChange);
  }

  onVariantChange(event) {
    this.updateOptions();
    this.updateMasterId();
    this.updateVariantStatuses();

    if (this.currentVariant) {
      this.updateURL();
      this.getProductInfo();
    } else {
      publish(EVENTS.variantChange, {
        detail: {
          sectionId: this.dataset.sectionId,
          html: null,
          variant: null,
        },
      });
    }
  }

  updateOptions() {
    this.options = Array.from(
      this.querySelectorAll("select, fieldset"),
      (element) => {
        if (element.tagName === "SELECT") {
          return element.value;
        }
        if (element.tagName === "FIELDSET") {
          return Array.from(element.querySelectorAll("input")).find(
            (radio) => radio.checked
          )?.value;
        }
      }
    );
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find(
      (variant) =>
        !variant.options
          .map((option, index) => this.options[index] === option)
          .includes(false)
    );
  }

  getVariantData() {
    this.variantData =
      this.variantData ||
      JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }

  updateVariantStatuses() {
    const selectedOptionOneVariants = this.variantData.filter(
      (variant) => this.querySelector(":checked").value === variant.option1
    );
    const inputWrappers = [...this.querySelectorAll("fieldset")];
    inputWrappers.forEach((option, index) => {
      if (index === 0) return;
      const optionInputs = [
        ...option.querySelectorAll('input[type="radio"], option'),
      ];
      const previousOptionSelected =
        inputWrappers[index - 1].querySelector(":checked").value;
      const availableOptionInputsValue = selectedOptionOneVariants
        .filter(
          (variant) =>
            variant.available &&
            variant[`option${index}`] === previousOptionSelected
        )
        .map((variantOption) => variantOption[`option${index + 1}`]);
      this.setInputAvailability(optionInputs, availableOptionInputsValue);
    });
  }

  setInputAvailability(elementList, availableValuesList) {
    elementList.forEach((element) => {
      const value = element.getAttribute("value");
      const availableElement = availableValuesList.includes(value);

      if (element.tagName === "INPUT") {
        element.toggleAttribute("data-disabled", !availableElement);
      }
    });
  }

  updateURL() {
    if (!this.currentVariant || !("updateUrl" in this.dataset)) return;
    window.history.replaceState(
      {},
      "",
      `${this.dataset.url}?variant=${this.currentVariant.id}`
    );
  }

  getProductInfo() {
    const requestedVariantId = this.currentVariant.id;

    fetch(
      `${this.dataset.url}?variant=${requestedVariantId}&section_id=${this.dataset.sectionId}`
    )
      .then((response) => response.text())
      .then((responseText) => {
        // prevent unnecessary ui changes from abandoned selections
        if (this.currentVariant.id !== requestedVariantId) return;

        const html = new DOMParser().parseFromString(responseText, "text/html");

        publish(EVENTS.variantChange, {
          detail: {
            sectionId: this.dataset.sectionId,
            html,
            variant: this.currentVariant,
          },
        });
      });
  }
}

customElements.define("block-variant-picker", BlockVariantPicker);
