# Archetype Themes Reference Components

🕵️[View the components in the Component Explorer](https://archetype-components.myshopify.com/) (password `archetype`)

The `archetype-themes/reference-components` repository is a foundational part of the [Archetype Devkit preview](https://github.com/archetype-themes/devkit), providing a collection of components that together, create a basic online purchasing experience. With four main sections—media with text, header, product detail page (PDP), and cart—this repository is designed to showcase the structure, patterns, and conventions behind theme component development. Our goal is to educate and initiate detailed discussions on code patterns and approaches, aiming for enhanced, community-vetted solutions through your input.

Theme components aim to achieve the following value propositions:

- **Create new, enterprise ready themes in less time**
- **Establish code conventions and patterns associated with future-ready Shopify Liquid projects**
- **Maintain and update your catalogue of themes overt time with less overhead**
- **Focused work on well-scoped components instead of monolithic theme codebases**
- **Fewer regressions and less stressful updates w/ automated testing**

🧑‍🎨 [Check out the Figma file that accompanies these components!]()

---

## Table of Contents

- [Getting Started](#getting_started)
- [Usage Guidelines](#usage-guidelines)
- [Repository Structure](#repository-structure)
- [Development Checklist](#development-practices)
- [Contributing](#contributing)
- [Community and Discussions]()
- [FAQs]()
- [Changelog]()
- [License]()

---
## Getting Started

**Prerequisites**
1. [Install Shopify CLI](https://shopify.dev/docs/themes/tools/cli/install) + [Shopify CLI Theme Component Plugin](https://github.com/archetype-themes/plugin-theme-component)
2. Clone this repo to your dev machine

Theme components are developed separately from a theme using the `shopify theme component dev` command:

- **Develop theme components in isolation** - `shopify theme component dev` to launch the component explorer experience and develop components in isolation
- **Develop theme components inside a theme** - `shopify theme component dev --theme-path ../reference-theme` to develop your components in the context of a specific theme

---
## Usage Guidelines

Theme components are essentially Shopify snippets that import their own dependencies. They consist of vanilla theme files, including Liquid, CSS, JS, JSON, and other asset files like SVGs. 

Similar to web components, they use parameters to be configured by their parent scope, slots to insert variable content, and emit events to communicate with other components.

### Installing components into a theme

To use or update the components in a theme project, install them via the `shopify theme component install` command. This command builds the components into their respective vanilla theme files, such as `snippets/*.liquid` and `assets/*.js` and then copies them into your theme project. You can then commit your updated components to source control.

Once the components are installed in your theme, you can develop your theme using the Shopify CLI `shopify theme dev` command. Since components build into vanilla theme files, no additional tooling is needed to use them in your theme.

### Rendering components in a theme

To use a component in the theme, simply include wherever it needs to be used and configure it through snippet parameters as needed:

sections/header.liquid
```liquid
{% render 'section-header' %}

{% schema %}
{
  "name": "t:labels.header",
  "class": "header-section",
  "settings": [
    {
      "type": "select",
      "id": "menu_position",
      "label": "t:labels.layout",
      "default": "logo_left_menu_left",
      "options": [
        {
          "value": "logo_left_menu_left",
          "label": "t:labels.logo_left_menu_left"
        },
        {
          "value": "logo_left_menu_center",
          "label": "t:labels.logo_left_menu_center"
        }
      ]
    },
...

```

Some components, like [section-header](https://github.com/archetype-themes/reference-components/blob/main/components/section-header/section-header.liquid)have parameters that can be passed via the `{% render %}` tag but also have helpful defaults to reduce the amount of boilerplate needed to use them. Let's take a closer look.

components/section-header/section-header.liquid
```liquid
{% comment %}
  Header section

  Accepts the following attributes:
  - menu_link_list {string} - Link list to use for the main menu
  - menu_position {'below'|'left'|'center'|''} - Position of the main menu (left, center, right)

  Usage:
  {% render 'section-header' %}
{% endcomment %}

{%- liquid
  assign menu_link_list = menu_link_list | default: section.settings.menu_link_list | default: 'main-menu'
  assign menu_position = menu_position | default: section.settings.menu_position | default: ''
```

As we can see, this component has 2 attributes that can be set when it rendered via the `{% render %}`, including `menu_link_list` and `menu_position`. We could set `menu_position` manually in our `sections/header.liquid` file:

```liquid
{% render 'section-header', menu_position: 'below' %}
```

Or we could expose this parameter inside the theme editor by assigning it's value to a setting:
```
{% render 'section-header', menu_position: section.settings.menu_position %}
```

However this component includes helpful defaults so that you don't need to manually pass section settings to it if you use the appropriate section setting id:

```
assign menu_position = menu_position | default: section.settings.menu_position | default: ''
```

These defaults on variable assignment make the following code equivalent:
```liquid
{% render 'section-header', menu_position: section.settings.menu_position %}

{% comment} Is the same as {% endcomment %}

{% render 'section-header' %}
```

### Slots in components

Slots allow components to output variable content in a specific location, allowing child content to be self-contained so the parent doesn't need manage configurations for itself and all it's children. The most common use for slots is sections that include blocks. Let's take a look at the [sections/main-product.liquid](https://github.com/archetype-themes/reference-theme/blob/main/sections/main-product.liquid) section to see how slots are used:

[sections/main-product.liquid](https://github.com/archetype-themes/reference-theme/blob/main/sections/main-product.liquid)
```liquid
{%- liquid
  capture blocks
    for block in section.blocks
      case block.type
        when '@app'
          render block
        when 'description'
          render 'block-description', block: block
        when 'variant_picker'
          render 'block-variant-picker', block: block
        when 'buy_buttons'
          render 'block-buy-buttons', block: block
        when 'title'
          render 'block-title', block: block
        when 'price'
          render 'block-price', block: block
      endcase
    endfor
  endcapture

  render 'section-main-product', slot: blocks
-%}
```

As you can see `section-main-product` includes a parameter called `slot`. To use this slot, we capture it's content using the `{% capture %}` tag,  in this case all the blocks that are included via the theme editor, as pass it to the `slot` parameter. The component then inserts this content where it needs to go!

[components/section-main-product/section-main-product.liquid](https://github.com/archetype-themes/reference-components/blob/main/components/section-main-product/section-main-product.liquid)
```
<section class="main-product page-width page-width--flush-small" data-color-scheme="scheme-2">
  <div class="main-product__media-gallery">
    {{- product_media_gallery | default: product_media_gallery_default -}}
  </div>

  <div class="main-product__info">
    {{- slot -}}
  </div>
</section>
```

Slots prevent prop drilling and prevent the need to pass configurations through multiple levels of components

---
## Repository Structure

Components represent an self-contained piece of theme code that explicitly import all the dependencies they need to render on a page.
### Component File Structure
```
components/
├─ my-component/
│  ├─ assets/ ------------------------------> Files that will be installed into a theme's assets/ directory
│  │  ├─ custom-icon.svg
│  │  ├─ my-component.js
│  ├─ setup/ -------------------------------> Setup files used to configure the previewable state and presets when
│  │  │                                       a component is viewed inside the component explorer or having tests run
│  │  ├─ sections/ -------------------------> Section files used render and configure components within the explorer
│  │  │  ├─ my-component.liquid
│  │  ├─ templates/ ------------------------> Template JSON files used to define section states across different page
│  │  │  │                                    contexts. This allows multiple presets of a single component to be 
│  │  │  │                                    previewed accross multiple page contexts
│  │  │  ├─ index.my-component.json
│  │  │  ├─ product.my-component.json
│  ├─ tests/ -------------------------------> Automated tests used to ensure specific component functionality remains
│  │  │								          free of regressions
│  │  ├─ my-component.spec.js
│  ├─ snippets/ ----------------------------> Snippets that are only relevant to this component are aren't worth
│  │  │								          abstracting to a seperate component
│  │  ├─ my-component.snippet-a.liquid
│  ├─ my-component.liquid ------------------> The entrypoint for the component where all dependencies are declared 
│  ├─ main.css
│  ├─ README.md
```

### Component files vs Theme files

Theme components control the presentation of state and they receive that state from parameters, theme editor settings, and a stores global Liquid objects. 

Files that control state are excluded from theme components and remain in control of a theme project, including:
- `config/settings_schema.json` - Expose points of configuration in the Theme Editor that control state via global theme settings
- `config/settings_data.json` - Records state of global theme settings
- `layout/*.liquid` - The entrypoint for a theme where global state can be configured manually
- `sections/*.liquid` - Expose points of configuration in the Theme Editor that control state via section and block level theme settings
- `template/*.json` - Records state of section and block settings

Theme files that don't control state and are used by components to manage presentation include:
- `assets/*.js`
- `assets/*.css`
- `snippets/*.liquid`
### Main Liquid Component File

### Setup Files

### Test Files

### Components types 
- Section Components
- Block Components
- Utility Components
- Generic Components


---
## Component Development Checklist
   
### Component Liquid Entrypoint
```
{%- comment -%}
  Header section

  Accepts the following attributes:
  - slot_icons {string} - Slot for icons
  - menu_link_list {string} - Link list to use for the main menu
  - menu_position {'below'|'left'|'center'|''} - Position of the main menu (left, center, right)

  Usage:
  {% render 'section-header' %}
{%- endcomment -%}
```
- [ ] Add documentation to the top of the file
	- [ ] Description of what the component does
	- [ ] Attributes the component accepts. Each attribute should list its possible values and a description of what the attribute does
	- [ ] An example of the component’s usage

```
{%- liquid
  assign menu_link_list = menu_link_list | default: section.settings.menu_link_list | default: 'main-menu'
  assign menu_position = menu_position | default: section.settings.menu_position | default: ''
  assign color_scheme = color_scheme | default: section.settings.color_scheme | default: 'scheme-1'
-%}
```
- [ ] Add component attributes assignments
	- [ ] Each attribute should be overridable by passing the attribute to the component with the same name
	- [ ] Each attribute should also include fallbacks by using the `| default` Liquid filter. Fallbacks can include:
		- Section-level setting
		- Block-level setting
		- Global-level theme setting
		- And finally, a default hardcoded value
    - [ ] If an attribute is of a boolean value, you may need to include `| default: true, allow_false: true`
    - [ ] If an attribute is of an object type, the associated Shopify Liquid object should be specified
    - [ ] If an attribute is of any other type, e.g. string, these should be separate by a pipe as in `{'small'|'large'}`
  - [ ] All attributes defined at the top of the file should be the exclusive variables used throughout the file. There should not be any calls to setting values directly

```
{% liquid
    capture block
	    for block in section.blocks
			case block.type
		        when '@app'
			        render block
		        when 'image'
				    render 'block-image', block: block
		        when 'video'
				    render 'block-video', block: block
		        when 'model'
			        render 'block-model', block: block, autoplay: true
		    endcase
		endfor
	endcapture
	
	render 'section-media-with-text', slot: block
 %}
```
- [ ] Use slots to insert variable content outside the direct control of a component
	- [ ] When possible, components, like section components, should be built so that you can slot content into them
	- [ ] Slotted content can be any value but more often than not, it is a captured “rendered snippet” that is then passed as an attribute to that component
	- [ ] This provides you with a way to modify any components, by passing them attribute values, you may need before you slot them into a component
 
### Styles
  - [ ] Resides in the component’s `main.css` file
  - [ ] CSS file can import any shared CSS files by referencing the paths to those files, typically from the repo’s root `styles/` folder
  - [ ] CSS can leverage custom variables defined in any part of the theme’s CSS code, but typically will leverage the custom variables defined inside of the `css-variables.liquid` component
  - [ ] Modern CSS syntax can be used as these files are processed for browser compatibility with PostCSS
  - [ ] Any CSS can be overridden by including a CSS file within the theme that overrides CSS already defined in components
  
### Custom Elements

### CSS Variables

### Icons

### Sect

### Import Maps

### Island architecture
  - Some components can benefit from the island architecture, which loads in a component’s JavaScript based on some condition, e.g. interactivity, in view, etc.
  - Wrap code in `<is-land>` tag with an optional hydrate attribute reference, e.g. `on:visible`
  - The `<script>` reference to the component’s ES module should be wrapped inside of a `<template data-island>...</template>` tag, and should be included right above the closing `</is-land>` tag
- Custom elements
- Component can include custom elements
- Custom elements should be appropriately and uniquely named
- Custom element JS file should be included in the `assets/` folder as `{componentName}.js`
- Custom element JS file can import any shared JS files by referencing the paths to those files, defined in the repo’s root `importmap.json` file
- Components should communicate and pass data via custom events
  - Event should be appropriately and uniquely named, ideally with a namespace prefix
  - Import the relevant methods from the `pubsub` ES module
  - In one component, publish an event (via the `publish(eventName, data)` with the data passed as an object
  - In another component, subscribe and listen to that event (via the `subscribe(eventName, callback)` and fire a callback function
