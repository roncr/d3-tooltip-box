import { configuration } from './config';
import { formatPx, compileTemplate, isFunction, isD3Selection } from './utils';

/**
 * D3 tooltip plugin
 * Inspired by on http://bl.ocks.org/mbostock/1087001
 */
class Tooltip {
    constructor() {
        // Constants
        this._DEFAULT_POSITION_OFFSET = {left: 0, top: 0};

        // Variables
        this._tooltipClass = 'd3-tooltip-box';
        this._transitionSpeed = 200;
        this._parent = d3.select('body');
        this._dataAccessor = (d) => d.value;
        this._template = configuration.template();
        this._positionOffset = this._DEFAULT_POSITION_OFFSET;
    }

    /**
     * Initializes the tooltip container, if there is already
     * a container, reuses the same tooltip, otherwise creates
     * a new <div> container
     * @returns {d3.selection} tooltip container
     * @private
     */
    _initTooltip () {
        let tooltipEl = d3.select(`.${this._tooltipClass}`);
        if(tooltipEl.empty()) {
            tooltipEl = this._createTooltip();
        }
        return tooltipEl;
    }

    /**
     * Creates a new <div> as the container of the tooltip
     * @returns {d3.selection} new tooltip container 
     * @private
     */
    _createTooltip () {
        return this.parent().append('div')
            .attr('class', this._tooltipClass)
            .style({
                opacity: 0,
                position: 'absolute',
                'pointer-events': 'none'
            });
    }

    /**
     * Gets the content of the tooltip by either
     * compiling a static template or invoking the
     * function of a dynamic template
     * @param d the associated data
     * @returns {ELEMENT_NODE} content of the tooltip as HTML
     * @private
     */
    _getContent (d) {
        var template = this._template;
        if(isFunction(template)) {
            return template(d);
        } else {
            var data = this._dataAccessor(d);
            return compileTemplate(template, data);
        }
    }

    /**
     * Parent getter/setter
     * @param v the parent to set
     * @returns {d3.selection} the current parent (returned only if
     * invoked with no parameters)
     */
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

    /**
     * Position offset getter/setter, the offset must
     * be in the shape of {left: 0, top: 0}
     * @param v the offset to set
     * @returns {Object} current offset (returned only if invoked with
     * not parameters)
     */
    positionOffset(v) {
        if(arguments.length == 0) {
            return this._positionOffset;
        }

        this._positionOffset = Object.assign({}, this._DEFAULT_POSITION_OFFSET, v);
        return this;
    }

    /**
     * Data accessor getter/setter
     * @param v the accessor function to set
     * @returns {Function} the current accessor function (returned only if
     * invoked with no parameters)
     */
    data(v) {
        if(arguments.length == 0) {
            return this._dataAccessor;
        }

        this._dataAccessor = v;
        return this;
    }

    /**
     * Template getter/setter
     * @param v the template to set, if string it is considered
     * static template, if function it is considered dynamic template
     * and will be invoked with the associated data as parameter
     * @returns {*} the current template string or factory function
     * (returned only if invoked with no parameters)
     */
    template(v) {
        if(arguments.length == 0) {
            return this._template;
        }

        this._template = v;
        return this;
    }

    /**
     * Makes the tooltip visible
     * @param d the associated data of the selection
     */
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

    /**
     * Moves the tooltip to the mouse position
     */
    move() {
        let clientRect = this._tooltipEl.node().getBoundingClientRect();

        this._tooltipEl
            .style({
                left: formatPx(d3.event.pageX + this._positionOffset.left),
                top: formatPx(d3.event.pageY - clientRect.height + this._positionOffset.top)
            });
    }

    /**
     * Hides the tooltip
     */
    hide() {
        this._tooltipEl
            .transition(this._transitionSpeed)
            .style('opacity', 0);
    }

    /**
     * Attaches the tooltip event listeners to
     * the current selection
     * @returns {Function} function to be used for the
     * d3.selection.call method
     */
    bind() {
        let self = this;

        return function(selection) {
            selection.each(function(data) {
                var element = d3.select(this);

                element
                    .on('mouseover.d3-tooltip-box', (d) => { self.show(d); })
                    .on('mousemove.d3-tooltip-box', () => { self.move(); })
                    .on('mouseleave.d3-tooltip-box', () => { self.hide(); });
            });
        }
    }

}

/**
 * Tooltip factory, creates new instances of the tooltip
 * @returns {Tooltip} the new tooltip instance
 */
export default function tooltip() {
    var instance = new Tooltip();
    return instance;
}