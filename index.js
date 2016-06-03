import tooltip from './src/tooltip';
import { configurationSetter as config } from './src/config';

/*
 * Notes:
 * 1) module.exports is used instead of ES6 export, because Babel
 * will create a d3Tooltip.default object, which is not convenient
 * for browser usage.
 *
 * 2) derequire is used so that it can be bundled with browserify again
 * see:
 *  http://stackoverflow.com/a/28176927
 *  https://github.com/substack/node-browserify/issues/374
 *  https://github.com/substack/node-browserify/pull/1151
 */
module.exports = {
    tooltip,
    config
}