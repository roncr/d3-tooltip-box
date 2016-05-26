class TooltipConfig {
    constructor() {
        this._DEFAULT_CONFIG = {
          template:  "<div>${value}</div>"
        };
        this._config = this._DEFAULT_CONFIG;
    }

    configuration(v) {
        if(arguments.length == 0) {
            return this._config;
        }

        this._config = Object.assign({}, this._DEFAULT_CONFIG, v);
        return this;
    }

    template(v) {
        if(arguments.length == 0) {
            return this._config.template;
        }

        this._config.template = v;
        return this;
    }
}

export var configuration = new TooltipConfig();

export function configurationSetter(v) {
    console.warn('The usage of the global configuration API is in beta and could be removed, please use it with caution');
    configuration.configuration(v);
}