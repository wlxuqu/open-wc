/* eslint-disable prefer-spread */
import { html } from 'lit-element';
import { transform } from './transform.js'
import { registerElements } from "./scoped-elements.js";

export const createScopedHtml = (tags, myRegistry) => {
  const definedTags = registerElements(tags, myRegistry);

  // eslint-disable-next-line func-names
  return function() {
    // eslint-disable-next-line prefer-rest-params
    const args = Array.apply(null, arguments);
    const strings = args[0];
    const values = args.slice(1);

    return html.apply(null, [].concat([transform(strings, definedTags)], values));
  }
};
