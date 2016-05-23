# D3 Tooltip Box

Flexible D3 plugin to build legendary tooltips.

## Installation

**Coming soon**. The project is still in early development, once it is more stable it will be available in npm and bower.

## Usage

### Basic

The basic usage consists on creating a tooltip instance and them binding the tooltip to a SVG node(s). In order to create a new tooltip instance use `d3TooltipBox.tooltip()` then you can use the method `.data(...)` in order to define a data accessor (see more details below). The default template needs an object with the property `value` as output.

Once the initial configuration is completed, you can bind the tooltip to an SVG node by doing `.call(tooltip.bind())`.

Example:

```javascript
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

You can provide a custom template by using the `.template(...)` method in combination with the `.data(...)` method.

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

In order to build the tooltip on the fly, you can use the `.template(...)` method and provide a function, the function will be invoked with the data managed by D3 for the nodes.

```javascript
var tooltip = d3TooltipBox.tooltip()
    .template(function(d) {
        return '<div>Amount: '+ d.value +'</div>';
    });
```

## API Reference

<a name="pie" href="#pie">#</a> d3TooltipBox.<b>tooltip</b>()

Constructs a new tooltip with the default values for template and data accessor. If a tooltip already exists, reuses that tooltip. The default template is `<div>${value}<div>` and the default data accessor is `function(d) { return d.value; }`.

<a name="pie" href="#pie">#</a> tooltip().<b>data</b>([accessor])

Specifies how to extract a value from the associated data. *accessor* is a function invoked with the data attached to a given element, if using a static template, the output of this accessor must be a **plain object** (not child objects are allowed yet) where the properties map to the placeholders used in the static template. If *accessor* is not specified, returns the current data accessor.

<a name="pie" href="#pie">#</a> tooltip().<b>template</b>([template])

Specifies the template to be used, if *template* is a **string**, it is considered a static template, meaning the structure is not going to change, only the values shown by it, the static template can use the syntax *${propertyName}* to define placeholders, the static template will be compiled using the data defined through the `.data(...)` method, the name properties used in the template must match the properties in the data object in order to be compiled properly. The static templates are convenient for less and more easy to read code.

If *template* is a **function**, it is considered a dynamic template that can change in content and structure, the function will be invoked with data attached to node as D3 always does, hence this function as to define an HTML output that will be placed verbatim in the tooltip.