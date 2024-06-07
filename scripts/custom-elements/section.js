const ThemeEditorEventHandlerMixin = (Base) =>
  class extends Base {
    connectedCallback() {
      if (Shopify.designMode) {
        this.boundEventMap = this.createThemeEditorEventMap()

        Object.entries(this.boundEventMap).forEach(([event, boundHandler]) => {
          const target = event.includes('section') ? document : this
          target.addEventListener(event, boundHandler)
        })

        if (typeof this.onSectionLoad === 'function') {
          this.onSectionLoad()
        }
      }
    }

    disconnectedCallback() {
      if (Shopify.designMode) {
        Object.entries(this.boundEventMap).forEach(([event, boundHandler]) => {
          if (event.includes('section')) {
            document.removeEventListener(event, boundHandler)
          }
        })

        if (typeof this.onSectionUnload === 'function') {
          this.onSectionUnload()
        }
      }
    }

    createThemeEditorEventMap() {
      const events = [
        'shopify:section:select',
        'shopify:section:deselect',
        'shopify:section:reorder',
        'shopify:block:select',
        'shopify:block:deselect'
      ]

      return events.reduce((acc, eventName) => {
        const methodName = this.convertEventToMethodName(eventName)

        if (typeof this[methodName] === 'function') {
          acc[eventName] = this.createEventBoundHandler(this[methodName])
        }

        return acc
      }, {})
    }

    convertEventToMethodName(eventName) {
      const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }

      return `on${eventName.split(':').slice(1).map(capitalize).join('')}`
    }

    createEventBoundHandler(handler) {
      return (event) => {
        if (event.detail && event.detail.sectionId === this.sectionId) {
          handler.call(this, event)
        }
      }
    }
  }

class Section extends HTMLElement {
  get sectionId() {
    if (!this._sectionId) {
      this._sectionId = this.getAttribute('section-id') || this.extractSectionId(this)
    }

    return this._sectionId
  }

  extractSectionId(element) {
    element = element.classList.contains('shopify-section') ? element : element.closest('.shopify-section')
    return element.id.replace('shopify-section-', '')
  }
}

export class HTMLSectionElement extends ThemeEditorEventHandlerMixin(Section) {}
