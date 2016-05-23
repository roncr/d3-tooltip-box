function formatPx(value){
    return `${value}px`;
}

// Inspired by on http://bl.ocks.org/mbostock/1087001
class Tooltip {
    constructor() {
        this._tooltipClass = 'd3-tooltip-box';
        this._transitionSpeed = 200;

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

    show(d) {
        this._tooltipEl
            .transition(this._transitionSpeed)
            .style("opacity", 1);
        this._tooltipEl.html(`<div>${d.value}</div>`);
    }

    move() {
        this._tooltipEl
            .style({
                left: formatPx(d3.event.pageX),
                top: formatPx(d3.event.pageY - 28)
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

                element.on('mouseover.d3-tooltip-box', () => { self.show(); })
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