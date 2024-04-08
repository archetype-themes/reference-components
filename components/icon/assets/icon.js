class xIcon extends HTMLElement {
  constructor() {
    super()

    this.src = this.getAttribute("src")
    this.name = this.getAttribute("data-name")
  }

  async connectedCallback() {
    if (!this.src) return

    try {
      const response = await fetch(this.src)
      const svg = await response.text()

      this.innerHTML = svg
      this.querySelector("svg").classList.add("icon", `icon--${this.name}`)
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }
}

customElements.define("x-icon", xIcon)
