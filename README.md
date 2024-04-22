# Reference Components

The `reference-components` repository is a foundational part of the [Archetype Devkit preview](https://github.com/archetype-themes/devkit). It provides a collection of components that, together, create a simple, straightforward, online-purchasing experience.

This repository contains 4 primary sections: header, media with text, product detail page (PDP), and cart page, and is designed to showcase the structure, patterns, and code conventions behind our approach to theme component development.

Theme components aim to achieve the following value propositions:

- **Focus development on modular components**: Encourage efficient and manageable development by focusing on discrete, well-defined components rather than large, complex codebases. This modularity enables easier customization and faster updates across themes projects.
- **Standardize code for future-ready Shopify Liquid projects**: Establish coding standards and patterns that ensure future scalability and adaptability.
- **Accelerate enterprise theme creation**: Speed up the development of professional-grade themes to enable quicker deployment and streamlined market entry. This allows developers to leverage common components across all themes, ensuring consistency and quality.
- **Streamline theme catalog maintenance and updates**: Simplify the maintenance and enhancement of your theme portfolio, significantly reducing the resources and effort required. This streamlined approach helps in reusing components and maintaining uniformity across all projects.
- **Reduce regressions with automated testing**: Integrate automated testing to maintain stability and simplify updates, minimizing regressions and reducing the stress associated with deploying new features to your themes.

Our goal is to improve knowledge across the Shopify theme ecosystem and encourage detailed discussions on theme coding patterns and methodologies.

### Resource previews

🧑‍🎨 View the [Figma design file]() that accompanies these components.
🕵️ View the components in the [Component explorer](https://archetype-components.myshopify.com/) (password `archetype`)

## Table of Contents

- [Getting started](#getting-started)
- [Usage guidelines](#usage-guidelines)
- [Concepts](#concepts)
- [Contributing](#contributing)
- [License]()

## Getting Started

### Prerequisites

Before you can work with theme components, you'll need to ensure you have the following tooling installed on your local development machine:

- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli/install)
- [Shopify CLI Theme Component plugin](https://github.com/archetype-themes/plugin-theme-component)

Once these are installed, clone this `reference-components` repository to your local development machine.

### Reference theme

If you prefer to develop and/or test theme components within a theme context rather than using the component explorer, we've included a [reference theme](https://github.com/archetype-themes/reference-theme) repository as an additional resource. You can clone this repository to your local development machine and use it to learn more about how theme components are implemented and used.

You can find more detailed information in the [reference theme's README](https://github.com/archetype-themes/reference-theme#readme).

## Usage guidelines

Theme components are created, developed, and installed using `shopify theme component`. You can find more detailed information about this command and each of its arguments in the [Shopify CLI Theme Component README](https://github.com/archetype-themes/plugin-theme-component#readme).

All theme components are contained within the `components` directory located at the root directory of this repository.

### Creating components

You can create a new component with the `shopify theme component generate` command. This will generate a new theme component in the `components` directory with boilerplate code.

### Developing components

When developing a theme component, you have two separate workflows to choose from. You can either develop theme components:

- **Inside the component explorer**: the `shopify theme component dev` command launches the component explorer and allows you to develop components in isolation.
- **Inside a theme**: the `shopify theme component dev --theme-path="../reference-theme"` command allows you to develop your components within the context of a specified theme.

### Installing components

You can install a component (or list of components) with the `shopify theme component install` command. This command is only ran within a Shopify theme project which then imports the latest changes of your components into your theme.

## Concepts

Theme components exist as modular Shopify snippets that manage their own dependencies, similar to web components. They are self-contained units of theme code that explicitly import all necessary dependencies in order to function correctly in any context. These components are composed of standard files such as Liquid, CSS, JS, and other assets like SVGs. They use parameters for configuration, slots for inserting variable content, and can emit events to communicate with other components.

While the only requirement for each component is the theme component Liquid file, a typical folder structure for a component can include a variety of additional folders and files, as illustrated below:

```
📂 my-component/
├─ 📂 assets/
│  ├─ custom-icon.svg
│  ├─ my-component.js
├─ 📂 setup/
│  ├─ 📂 sections/
│  │  ├─ my-component.liquid
│  ├─ 📂 templates/
│  │  ├─ index.my-component.json
│  │  ├─ product.my-component.json
├─ 📂 snippets/
│  ├─ my-component.snippet-a.liquid
├─ 📂 tests/
│  ├─ my-component.spec.js
├─ my-component.css
└─ my-component.liquid
```

### Distinction between theme component files and theme files

Theme component files focus on presentation and user interaction, making them customizable and reusable across any number of themes while theme files maintain the functionality of the store by managing state and defining the settings to be included. The specific settings included as part of theme files directly influence the behavior of theme components.

The goal is to enforce a clear separation of concerns between theme component files and theme files.

#### Theme component files

Theme component files primarily manage the visual presentation of the theme. These files are modular and are specifically designed to handle how elements look and behave on the front end.

A theme component accepts inputs that adjust its behavior and/or appearance in the form of **parameters**. Parameters allow developers to pass specific values that tailor the component's functionality or style according to the needs of the theme, and typically, but not always, reference:

- **Theme editor settings**: Components use settings defined within the Shopify theme editor to adapt to different configurations and enables theme developers (and users) to customize components without directly editing code.
- **Liquid objects/values**: Component files can access and use global variables defined across the Shopify platform and/or values that are passed directly to them.

#### Theme files

Theme files are responsible for managing and maintaining the state across the entire theme. They ensure that the theme is the one to store values for its settings and configurations so that theme components can then use these values. Theme files include:

- **Config files**: for example `config/settings_schema.json` and `config/settings_data.json` manage the global settings of the theme.
- **Layout files**: for example `layout/*.liquid` acts as a main entry point for themes where the global state is manually configured.
- **Section and template files**: for example `sections/*.liquid` and `template/*.json` files control the state at a more granular level, such as within individual sections or blocks by defining theme editor settings.

> **NOTE**: Theme components have default settings for each parameter, which are used if no other value is specified. This allows theme developers to easily change these defaults when necessary by overriding the parameter.

### Liquid component file

Each component directory must include a Liquid component file, which serves as the essential entry point for the component. Upon installing a component into a theme project, the Liquid component file will be generated as a separate snippet file.

It is common practice to name the Liquid component file after the component directory itself. For example, a component named `my-component` would typically have a corresponding Liquid file named `my-component/my-component.liquid`.

### Theme component types

While all theme components are fundamentally modular Liquid snippets, their design and intended use within a Shopify theme can vary. We categorize components based on their specific roles and how they enhance different parts of the theme:

#### Section Components

Section components are robust, reusable parts of Shopify themes that users can manipulate through the theme editor. These components are typically used for larger areas of a page, like headers, footers, or any other content sections.

For example, the `section-header` component defines the layout and functionality of the site's header section. This would then include other theme components for the store's main navigation and cart icon.

#### Block Components

Block components are smaller, more specific elements that can be nested within section components. They are designed to be customizable within the Shopify theme editor, allowing users to adjust individual blocks of content like text, images, or buttons.

For example, the `block-model` component defines the output and functionality of a product's 3D model based on whatever `product` object is passed to it.

#### Generic Components

Generic components are versatile and reusable elements that aren't necessarily specific to any part of the theme but can be used in multiple contexts. They are akin to web development's "web components," designed to be plug-and-play across different locations within a theme.

For example, the `icon` component defines the output for a specific icon which can be used in any context, like the header section, the block model, etc.

#### Utility Components

Utility components are designed to provide specific, non-visual functionality that can be used across various parts of a theme. Unlike presentational components, they focus on enhancing a theme’s practical capabilities, adding essential features such as performance enhancements or specialized snippet inclusions.

For example, the `font-faces` component outputs a font preload link based on a given `font` object.

### Setup Files

### Test Files

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

As you can see `section-main-product` includes a parameter called `slot`. To use this slot, we capture it's content using the `{% capture %}` tag, in this case all the blocks that are included via the theme editor, as pass it to the `slot` parameter. The component then inserts this content where it needs to go!

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

<!-- TODO: figure out where this goes -->

### Something goes here

Theme components can dynamically render other components using the `render` tag. If a component is designed to accept a "slot" parameter, you can use the `capture` tag to grab Liquid code—or any value—and pass it as variable content to the component’s "slot" parameter.

It's essential to recognize that most of these practices are already established in Shopify theme development. Our approach to theme components further leverages these existing mechanisms to simplify and enhance the flexibility of building components, and by extension, entire themes.

<!-- THIS IS FOR REFERENCE THEME -->

### Installing theme components into a theme

To integrate components into your theme project:

1. Use the `shopify theme component install` command to build and transfer the necessary files, e.g. `snippets/*.liquid`, `assets/*.js`, etc.
2. Develop and manage your theme using the `shopify theme dev` command, leveraging the straightforward nature of these vanilla theme files.

To use or update the components in a theme project, install them via the `shopify theme component install` command. This command builds the components into their respective vanilla theme files, such as `snippets/*.liquid` and `assets/*.js` and then copies them into your theme project. You can then commit your updated components to source control.

Once the components are installed in your theme, you can develop your theme using the Shopify CLI `shopify theme dev` command. Since components build into vanilla theme files, no additional tooling is needed to use them in your theme.

### Rendering components in a theme

To use a component in the theme, simply include wherever it needs to be used and configure it through snippet parameters as needed:

sections/header.liquid

```liquid
{% render 'section-header' %}

{% schema %}
{ "name": "t:labels.header", "class": "header-section", "settings": [ { "type": "select", "id": "menu_position",
"label": "t:labels.layout", "default": "logo_left_menu_left", "options": [ { "value": "logo_left_menu_left", "label":
"t:labels.logo_left_menu_left" }, { "value": "logo_left_menu_center", "label": "t:labels.logo_left_menu_center" } ] },
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

{% comment %}

{% render 'section-header' %}
```

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
