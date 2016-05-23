import { formatPx, compileTemplate, isFunction } from './utils';

// Inspired by on http://bl.ocks.org/mbostock/1087001
class Tooltip {
    constructor() {
        this._tooltipClass = 'd3-tooltip-box';
        this._transitionSpeed = 200;
        this._dataAccessor = (d) => d.value;
        this._template = "<div>${value}</div>";

        // Gets/Creates tooltip
        let tooltipEl = d3.select(`.${this._tooltipClass}`);
        if(tooltipEl.empty()) {
            tooltipEl = this._createTooltip();
        }
        this._tooltipEl = tooltipEl;
    }

    _createTooltip () {
        return d3.select('body').append('div')
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
        let html = this._getContent(d);

        this._tooltipEl
            .html(html);

        this._tooltipEl
            .transition(this._transitionSpeed)
            .style("opacity", 1);
    }

    move() {
        this._tooltipEl
            .style({
                left: formatPx(d3.event.pageX + 5),
                top: formatPx(d3.event.pageY - 32)
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