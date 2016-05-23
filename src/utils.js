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