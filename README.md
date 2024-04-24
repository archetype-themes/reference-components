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

You can view the [Figma design file]() that accompanies these components as well as view the components in the [Component explorer](https://archetype-components.myshopify.com/) (password `archetype`).

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

Theme components exist as modular Shopify snippets that manage their own dependencies, similar to web components. They are self-contained units of theme code that explicitly import all necessary dependencies in order to function correctly in any theme context. These components are composed of standard files such as Liquid, CSS, JS, and other assets like SVGs. They use parameters for configuration, slots for inserting variable content, and can emit events to communicate with other components.

### File structure

The `reference-components` repository contains all assets associated to components, including any common scripts and styles that can be used across any one of them.

The only required folder is `components/`, both `script/` and `styles/` are optional. See the repository file structure below:

```
📂 reference-components/
├─ 📂 components/
│ ├─ 📂 my-component/
│ │ ├─ 📂 assets/
│ │ │ ├─ custom-icon.svg
│ │ │ ├─ my-component.js
│ │ ├─ 📂 setup/
│ │ │ ├─ 📂 sections/
│ │ │ │ ├─ my-component.liquid
│ │ │ ├─ 📂 templates/
│ │ │ │ ├─ index.my-component.json
│ │ │ │ ├─ product.my-component.json
│ │ ├─ 📂 tests/
│ │ │ ├─ my-component.spec.js
│ │ ├─ my-component.css
│ │ └─ my-component.liquid
├─ 📂 scripts/
└─ 📂 styles/
```

- `components/`: Contains all your components.
  - `assets/`: Asset files associated to the component. Typically contains assets like JavaScript and SVG files that require a transformation step.
  - `setup/`: Used in conjunction with the component explorer to preview the component.
    - `section/`: The section (and its JSON schema) that you want to view the component in.
    - `templates/`: The JSON templates that you want to view the component in.
  - `tests/`: Test files for the component. Uses [Playwright](https://playwright.dev/) to run tests.
  - `{component}.css`: Entrypoint for the component's CSS. Other CSS files can be added in the root directory.
  - `{component}.liquid`: Component Liquid file that gets generated into a snippet when installed in the theme.
- `scripts/`: Contains common scripts that components can reference.
- `styles/`: Contains common styles that components can reference.

> **_NOTE:_** Behind the scenes, ny asset files added to your components will automatically be moved to your theme's `assets/` directory. Similarly, any Liquid files will automatically be moved to the `snippets/` directory.

#### Liquid component file

Each component directory must include a Liquid component file, which serves as the essential entry point for the component. Upon installing a component into a theme project, the Liquid component file will be generated as a separate snippet file.

It is common practice to name the Liquid component file after the component directory itself. For example, a component named `my-component` would typically have a corresponding Liquid file named `my-component/my-component.liquid`. However, this naming convention is not enforced.

Other than the Liquid component file, all other files within the component directory are optional.

### Theme component types

While all theme components are fundamentally modular Liquid snippets, their design and intended use within a Shopify theme can vary. We categorize components based on their specific roles and how they enhance different parts of the theme:

#### Section Components

Section components are robust, reusable parts of Shopify themes that users can manipulate through the theme editor. These components are typically used for larger areas of a page, like headers, footers, or any other content sections.

For example, the [`section-header`](https://github.com/archetype-themes/reference-components/tree/main/components/section-header) component defines the layout and functionality of the site's header section. This would then include other theme components for the store's main navigation and cart icon.

#### Block Components

Block components are smaller, more specific elements that can be nested within section components. They are designed to be customizable within the Shopify theme editor, allowing users to adjust individual blocks of content like text, images, or buttons.

For example, the [`block-model`](https://github.com/archetype-themes/reference-components/tree/main/components/block-model) component defines the output and functionality of a product's 3D model based on whatever `product` object is passed to it.

#### Generic Components

Generic components are versatile and reusable elements that aren't necessarily specific to any part of the theme but can be used in multiple contexts. They are akin to web development's "web components," designed to be plug-and-play across different locations within a theme.

For example, the [`icon`](https://github.com/archetype-themes/reference-components/tree/main/components/icon) component defines the output for a specific icon which can be used in any context, like the header section, the block model, etc.

#### Utility Components

Utility components are designed to provide specific, non-visual functionality that can be used across various parts of a theme. Unlike presentational components, they focus on enhancing a theme’s practical capabilities, adding essential features such as performance enhancements and other standard front-end functionality.

For example, the [`font-faces`](https://github.com/archetype-themes/reference-components/tree/main/components/font-faces) component outputs a font preload link based on a given `font` object.

### Anatomy of a component

Each component is broken down in a specific way. The details below are based on our own approach to developing components, meaning entirely optional. Read on to better understand the anatomy of a component and how we structure our own.

#### Documentation

Each theme component should include a Liquid `comment` tag at the beginning of the file, outlining key information about the component:

```liquid
{% comment %}
  Header section

  Accepts:
  - slot_icons {string} - Slot for icons
  - menu_link_list {string} - Link list to use for the main menu
  - menu_position {'below'|'left'|'center'} - Position of the main menu

  Usage:
  {% render 'section-header' %}
{% endcomment %}
```

The documentation for each component is organized into three main parts:

- **Description**: Explains the component’s function.
- **Parameters**: Lists parameters the component accepts, with possible values and their purposes.
- **Usage example**: (Optional) Demonstrates how to use the component within the theme or other components.

This structured approach to documentation ensures that every component is clearly defined, making it easier for developers to learn about and use the theme component in practice.

#### Parameter list and order of precedence

The parameter list defines the accepted parameters for each component within the theme. Here’s how you can define a parameter list using Liquid:

```liquid
{%- liquid
  assign menu_link_list = menu_link_list | default: section.settings.menu_link_list | default: 'main-menu'
  assign menu_position = menu_position | default: section.settings.menu_position | default: ''
-%}
```

It's vital to manage how data is passed and used effectively in each component. Remember, components should be self-contained snippets, designed to function independently. The order of precedence plays a crucial role in achieving this functionality.

Parameter values are determined through a cascading order:

1. **Directly passed parameter**: First, we check if the parameter has been directly passed to the component. This provides the most specific level of control.
2. **Section/Block setting**: If the parameter is not directly passed, the next level checked is the section or block setting. If a setting with a matching ID exists, such as `section.settings.menu_link_list`, its value is used.
3. **Default value**: In the absence of direct parameters or settings, a predefined default value is used. This ensures that every parameter has a value, defaulting to Liquid’s `nil` if none is specified.

This cascading system allows each step to be optional. You can choose to enforce a parameter as "required" by omitting a list of fallbacks.

The simplicity of this system allows for more straightforward syntax when reference the component in your theme. Typically, you can render a component without specifying all parameters:

```liquid
{% render 'section-header' %}
```

However, you can easily override any parameter by passing it directly:

```liquid
{% render 'section-header', menu_link_list: 'some-other-menu' %}
```

This approach not only maintains a clear and organized parameter list but also enhances the legibility and usability of a theme component.

It makes it easier to maintain since the most relevant context for any theme developer jumping into the component's code is at the top of the file, meaning the documentation and the parameter list become the component's API.

#### HTML/Liquid code

In its simplest form, this section is where your component's HTML/Liquid code should be placed.

The content included here depends entirely on the [type of component](#theme-component-types) you are building. For general theme components, you may include any HTML or Liquid markup as needed.

If your component involves integrating JavaScript modules, you should refer to our guidelines in the [Import maps](#import-maps) section to understand our approach to handling JavaScript imports more effectively.

#### Import maps

We embrace the modern web, and we recognize the importance of a simpler and more straightforward approach to JavaScript in themes. A fundamental tool in achieving this modularity is through JavaScript modules.

A key feature of the [Shopify CLI Theme Component plugin](https://github.com/archetype-themes/plugin-theme-component) is its capability to detect JavaScript files and automatically construct an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) as a snippet. This import map snippet can then be integrated into your theme's code.

The backbone of this is the [`import-map.json`](https://github.com/archetype-themes/reference-components/blob/main/importmap.json) file located at the root of the `reference-components` repository. Here is an example of what it looks like:

```json
{
  "imports": {
    "components/*": "components/**/*.js"
  }
}
```

This file defines all imports that can be utilized across components. It accepts module specifiers with glob patterns or wildcards and resolves JavaScript from URLs or file patterns.

For instance, in the [`icon`](https://github.com/archetype-themes/reference-components/blob/main/components/icon/assets/icon.js) component, a JavaScript module specified in the import map needs to be loaded. This is facilitated through an `import-map.liquid` snippet:

```js
<script type="importmap">
{
  "imports": {
    "components/icon": "{{ 'icon.js' | asset_url }}"
  }
}
</script>
```

You can include this snippet in your theme’s layout, typically within the [`layout/theme.liquid`](https://github.com/archetype-themes/reference-theme/blob/main/layout/theme.liquid#L19) file, to ensure all specified modules are correctly loaded.

Keep in mind, an import map simply references modules in the form of a map. A JavaScript module will only be loaded if it is explicitly referenced or imported by a component.

### Components as composable elements

We view components as composable elements, similar to building blocks in a LEGO set. Just like LEGO pieces, these elements can be replaced and swapped out with others.

One idea is to empower developers with a more flexible approach by making parts of components swappable, using the concept of "slots" in Liquid. If a component is designed to accept a ["slot" parameter](#slots-in-components), you can use the Liquid `capture` tag to grab Liquid code—or any value—and pass it as variable content to the component’s "slot" parameter.

Also, because components are essentially modular snippets, they can dynamically render other components using the Liquid `render` tag.

It's essential to recognize that these practices are already established in Shopify theme development. Our approach to theme components further leverages these existing mechanisms to simplify and enhance the flexibility of building components, and by extension, entire themes.

#### Slot parameters

Slots are fundamentally "placeholder areas" in which you can _slot_ in content.

Slots enable components to display variable content in designated areas, ensuring that child content is self-contained. This setup allows the parent component to operate without having to manage configurations for both itself and its child components. While not always the case, slots are most commonly used in sections that contain blocks.

For example, in the reference theme, the [`main-product`](https://github.com/archetype-themes/reference-theme/blob/main/sections/main-product.liquid) section defines its JSON schema with a set of blocks. In Liquid, it then captures this list of blocks and injects them into a designated slot location within the `section-main-product` component:

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

The `section-main-product` component includes a parameter called `slot`. To use this slot, we capture it's content using the Liquid `capture` tag, and it's then up to the component to output the slot content wherever it needs to go.

If we then look at the [`section-main-product`](https://github.com/archetype-themes/reference-components/blob/main/components/section-main-product/section-main-product.liquid) component, you'll see the `slot` parameter being outputted:

```liquid
{%- liquid
  capture product_media_gallery_default
    render 'product-media-gallery'
  endcapture
-%}

<section>
  <div class='main-product__media-gallery'>
    {{- product_media_gallery | default: product_media_gallery_default -}}
  </div>

  <div class='main-product__info'>
    {{- slot -}}
  </div>
</section>
```

You may have also noticed a reference to a `product_media_gallery_default` variable at the top of the file that captures a `product-media-gallery` component. In this case, the `product_media_gallery` parameter is entirely optional and it would fall back to the default value if it isn't specified.

If you're thinking this looks to be another slot for this component, you would be correct! And because of this, you're able to easily swap out the `product_media_gallery` content with your very own, including an entirely different component.

<!-- TODO: component tests -->

<!-- Theme primitives -->
<!-- Importmaps -->

<!-- Testing -->
<!-- ### Setup Files -->

<!-- ### Test Files -->

<!-- THIS IS FOR REFERENCE THEME -->

### Distinction between theme component files and theme files

Theme component files focus on presentation and user interaction, making them customizable and reusable across any number of themes while theme files maintain the functionality of the store by managing state and defining the settings to be included. The specific settings included as part of theme files directly influence the behavior of theme components.

The goal is to enforce a clear separation of concerns between theme component files and theme files.

#### Theme component files

Theme component files primarily manage the visual presentation of the theme. These files are modular and are specifically designed to handle how elements look and behave on the front-end.

A theme component accepts inputs that adjust its behavior and/or appearance in the form of **parameters**. Parameters allow developers to pass specific values that tailor the component's functionality or style according to the needs of the theme, and typically, but not always, reference:

- **Theme editor settings**: Components use settings defined within the Shopify theme editor to adapt to different configurations and enables theme developers (and users) to customize components without directly editing code.
- **Liquid objects/values**: Component files can access and use global variables defined across the Shopify platform and/or values that are passed directly to them.

#### Theme files

Theme files are responsible for managing and maintaining the state across the entire theme. They ensure that the theme is the one to store values for its settings and configurations so that theme components can then use these values. Theme files include:

- **Config files**: for example `config/settings_schema.json` and `config/settings_data.json` manage the global settings of the theme.
- **Layout files**: for example `layout/*.liquid` acts as a main entry point for themes where the global state is manually configured.
- **Section and template files**: for example `sections/*.liquid` and `template/*.json` files control the state at a more granular level, such as within individual sections or blocks by defining theme editor settings.
