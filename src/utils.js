/**
 * Attaches the 'px' suffix to a number
 * @param value the value to be formatted
 * @returns {string} the numeric value with the 'px' attached
 */
export function formatPx(value){
    return `${value}px`;
}

/**
 * Compiles a template by replacing the properties in the form
 * of ${propertyName} by the corresponding value provided in the
 * data object
 * @param template the raw template to compile
 * @param data the data containing the values to be used to replace
 * the placeholders
 * @returns {String} the compiled template
 */
export function compileTemplate (template, data) {
    for(let prop in data) {
        var regex = new RegExp(`\\$\\{${prop}\\}`, 'gi');
        template = template.replace(regex, data[prop]);
    }

    return template;
}

/**
 * Tests if an object is a function
 * @param obj object to test
 * @returns {boolean} true if the object is a function,
 * false otherwise
 */
export function isFunction (obj) {
    return typeof obj === 'function';
}

/**
 * Tests if the object is a D3 selection
 * @param obj object to test
 * @returns {boolean} true if the object is a D3 selection,
 * false otherwise
 */
export function isD3Selection (obj) {
    return obj instanceof d3.selection;
}