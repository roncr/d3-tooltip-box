# D3 Tooltip Box

Flexible D3 plugin to build legendary tooltips.

## Installation

#### NPM

    npm install --save d3-tooltip-box

#### Bower

    bower install --save d3-tooltip-box

## Usage

### Basic

The basic usage consists on creating a tooltip instance and them binding the tooltip to a SVG node(s). In order to create a new tooltip instance use `d3TooltipBox.tooltip()` then you can use the method `.data(...)` in order to define a data accessor. The default template needs an object with the property `value` as output.

Once the initial configuration is completed, you can bind the tooltip to an SVG node by doing `.call(tooltip.bind())`. Check the [API Reference](#api-reference) for more.

Example:

```javascript
import d3TooltipBox from 'd3-tooltip-box';
//
var width = 960,
    height = 500;
//
var tooltip = d3TooltipBox.tooltip()
    .data(function() {
        return {
            value: 20
        }
    });
//
var svg = d3.select("svg")
    .append("g")
    .attr("transform", "translate(480,50) rotate(60) scale(2)")
    .append("rect")
    .attr("width", 140)
    .attr("height", 140)
    .call(tooltip.bind());
```

### Static Custom Template

You can provide a custom template by using the `.template(...)` method in combination with the `.data(...)` method. Check the [API Reference](#api-reference) for more.

```javascript
var tooltip = d3TooltipBox.tooltip()
    .data(function() {
        return {
            size: 20
        }
    })
    .template('<div>Value: ${size}</div>');
```


### Dynamic Custom Template

In order to build the tooltip on the fly, you can use the `.template(...)` method and provide a function, the function will be invoked with the associated data attached by D3 for the nodes. Check the [API Reference](#api-reference) for more.

```javascript
var tooltip = d3TooltipBox.tooltip()
    .template(function(d) {
        return '<div>Amount: '+ d.value +'</div>';
    });
```

## API Reference

<a name="tooltip" href="#pie">#</a> d3TooltipBox.<b>tooltip</b>()

Constructs a new tooltip with the default values for template and data accessor. If a tooltip already exists, reuses that tooltip. The default template is `<div>${value}<div>` and the default data accessor is `function(d) { return d.value; }`.

<a name="data" href="#data">#</a> tooltip().<b>data</b>([accessor])

Specifies how to extract a value from the associated data. *accessor* is a function invoked with the data attached to a given element, if using a static template, the output of this accessor must be a **plain object** (not child objects are allowed yet) where the properties map to the placeholders used in the static template. If *accessor* is not specified, returns the current data accessor.

<a name="template" href="#template">#</a> tooltip().<b>template</b>([template])

Specifies the template to be used, if *template* is a **string**, it is considered a static template, meaning the structure is not going to change, only the values shown by it, the static template can use the syntax *${propertyName}* to define placeholders, the template will be compiled using the data obtained from the `.data(...)` method, the placeholders used in the template must match the properties in the data object in order to compile the template properly. The static templates are convenient for less and more easy to read code.

If *template* is a **function**, it is considered a dynamic template that can change in content and structure, the function will be invoked with data attached to node as D3 always does, hence this function as to define an HTML output that will be placed verbatim in the tooltip. If *template* is not provided, returns the current template.

<a name="parent" href="#parent">#</a> tooltip().<b>parent</b>([node])

Specifies the parent node of the tooltip, the default is `<body>`. *node* could be a [d3.selection](https://github.com/d3/d3/wiki/Selections#d3_select) or a selection from [document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector). If *node* is not specified, returns the current parent.

<a name="positionOffset" href="#positionOffset">#</a> tooltip().<b>positionOffset</b>([offset])

Specifies the offset of the tooltip relative to the mouse position, *offset* is an object containing the *left* and *top* properties with numeric values. The default is `{left: 0, top: 0}`. If *offset* is not specified, returns the current offset.