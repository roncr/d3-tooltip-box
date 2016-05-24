var d3TooltipBox = require('../build/d3-tooltip-box');

describe("High-level API test suite", function() {
   it("has tooltip function", function() {
       expect(d3TooltipBox.tooltip).toBeDefined();
   })
});