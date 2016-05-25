import { formatPx, compileTemplate, isFunction, isD3Selection } from './utils';

// Inspired by on http://bl.ocks.org/mbostock/1087001
class Tooltip {
    constructor() {
        this._DEFAULT_POSITION_OFFSET = {left: 0, top: 0};

        this._tooltipClass = 'd3-tooltip-box';
        this._transitionSpeed = 200;
        this._parent = d3.select('body');
        this._dataAccessor = (d) => d.value;
        this._template = "<div>${value}</div>";
        this._positionOffset = this._DEFAULT_POSITION_OFFSET;
    }

    _initTooltip () {
        let tooltipEl = d3.select(`.${this._tooltipClass}`);
        if(tooltipEl.empty()) {
            tooltipEl = this._createTooltip();
        }
        return tooltipEl;
    }

    _createTooltip () {
        return this.parent().append('div')
            .attr('class', this._tooltipClass)
            .style({
                opacity: 0,
                position: 'absolute'
            });
    }

    _getContent (d) {
        var template = this._template;
        if(isFunction(template)) {
            return template(d);
        } else {
            var data = this._dataAccessor(d);
            return compileTemplate(template, data);
        }
    }

    parent(v) {
        if(arguments.length == 0) {
            return this._parent;
        }

        if (!isD3Selection(v)) {
            v = d3.select(v);
        }
        this._parent = v;
        return this;
    }

    positionOffset(v) {
        if(arguments.length == 0) {
            return this._positionOffset;
        }

        this._positionOffset = Object.assign({}, this._DEFAULT_POSITION_OFFSET, v);
        return this;
    }

    data(v) {
        if(arguments.length == 0) {
            return this._dataAccessor;
        }

        this._dataAccessor = v;
        return this;
    }

    template(v) {
        if(arguments.length == 0) {
            return this._template;
        }

        this._template = v;
        return this;
    }

    show(d) {
        if(!this._tooltipEl) {
            this._tooltipEl = this._initTooltip();
        }

        let html = this._getContent(d);

        this._tooltipEl
            .html(html);

        this._tooltipEl
            .transition(this._transitionSpeed)
            .style("opacity", 1);
    }

    move() {
        let clientRect = this._tooltipEl.node().getBoundingClientRect();

        this._tooltipEl
            .style({
                left: formatPx(d3.event.pageX + this._positionOffset.left),
                top: formatPx(d3.event.pageY - clientRect.height + this._positionOffset.top)
            });
    }

    hide() {
        this._tooltipEl
            .transition(this._transitionSpeed)
            .style('opacity', 0);
    }

    bind() {
        let self = this;

        return function(selection) {
            selection.each(function(data) {
                var element = d3.select(this);

                element.on('mouseover.d3-tooltip-box', (d) => { self.show(d); })
                    .on('mousemove.d3-tooltip-box', () => { self.move(); })
                    .on('mouseleave.d3-tooltip-box', () => { self.hide(); });
            });
        }
    }

}

export default function tooltip() {
    var instance = new Tooltip();
    return instance;
}