export function formatPx(value){
    return `${value}px`;
}

export function compileTemplate (template, data) {
    for(let prop in data) {
        var regex = new RegExp(`\\$\\{${prop}\\}`, 'gi');
        template = template.replace(regex, data[prop]);
    }

    return template;
}

export function isFunction (obj) {
    return typeof obj === 'function';
}

export function isD3Selection (obj) {
    return obj instanceof d3.selection;
}