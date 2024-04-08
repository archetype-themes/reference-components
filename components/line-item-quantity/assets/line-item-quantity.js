import { EVENTS, publish, subscribe } from "@archetype-themes/scripts/utils/pubsub"

export class LineItemQuantity extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector("input")
    this.input.addEventListener("focus", this.onFocus.bind(this))
    this.addEventListener("change", this.onChange.bind(this))

    this.onCartErrorUnsubscriber = subscribe(EVENTS.cartError, this.handleCartError.bind(this))
  }

  disconnectedCallback() {
    this.onCartErrorUnsubscriber()
  }

  onFocus({ target }) {
    this.previousQuantityInputValue = target.value
  }

  async onChange({ target }) {
    target.setAttribute("disabled", "disabled")

    publish(EVENTS.cartBeforeChange)
    const responseJson = await this.changeCartQuantity(target.value)

    if (!responseJson.errors) {
      this.syncQuantityInputsInLineItem(this.index, target.value)

      const html = new DOMParser().parseFromString(responseJson?.sections[this.sectionId], "text/html")

      publish(EVENTS.lineItemChange, {
        detail: {
          html,
          index: this.index,
          quantity: target.value
        }
      })

      publish(EVENTS.cartChange, {
        detail: {
          cart: responseJson,
          item: "items" in responseJson ? responseJson["items"] : [responseJson]
        }
      })
    } else {
      publish(EVENTS.cartError, {
        detail: {
          errors: responseJson.errors,
          index: this.index,
          previousQuantityInputValue: this.previousQuantityInputValue
        }
      })
    }

    target.removeAttribute("disabled")
  }

  async changeCartQuantity(quantity) {
    const sectionsToBundle = [this.sectionId]
    const response = await fetch(`${window.Shopify.routes.root}cart/change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        line: this.index,
        quantity,
        sections: sectionsToBundle
      })
    })

    return response.json()
  }

  handleCartError({ detail }) {
    const { index, previousQuantityInputValue } = detail

    this.syncQuantityInputsInLineItem(index, previousQuantityInputValue)
  }

  syncQuantityInputsInLineItem(index, value) {
    const lineItem = this.closest("tr")
    const quantityInputs = lineItem.querySelectorAll(`[index="${index}"] > input`)

    quantityInputs.forEach((input) => (input.value = value))
  }

  get index() {
    return this.getAttribute("index")
  }

  get sectionId() {
    return this.getAttribute("section-id")
  }
}

customElements.define("line-item-quantity", LineItemQuantity)
