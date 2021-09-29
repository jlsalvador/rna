import path from 'path';
import { CSS_EXTENSIONS, styleResolve } from '@chialab/node-resolve';

/**
 * Generate a list of file paths with all style extensions.
 * @param {string} url
 * @return {string[]}
 */
function alternatives(url) {
    const results = path.extname(url) ?
        // url already has an extension.
        [url] :
        // remap the path with all style extensions.
        CSS_EXTENSIONS.map((ext) => `${url}${ext}`);
    // look for sass partials too.
    if (path.basename(url)[0] !== '_') {
        for (let i = 0, len = results.length; i < len; i++) {
            results.push(
                // add the _ for partial syntax
                path.join(
                    path.dirname(results[i]),
                    `_${path.basename(results[i])}`
                )
            );
        }
    }
    return results;
}

/**
 * Create a scoped SASS resolver.
 */
export default function() {
    /**
     * @type {string[]}
     */
    const resolved = [];

    /**
     * Resolve the file path of an imported style.
     * @type {import('sass').Importer}
     */
    return async function nodeResolver(url, prev) {
        if (url.match(/^(~|package:)/)) {
            // some modules use ~ or package: for node_modules import
            url = url.replace(/^(~|package:)/, '');
        }

        // generate alternatives for style starting from the module path
        // add package json check for `style` field.
        const splitted = url.split('/');
        let toCheck;
        if (splitted.length === 1) {
            toCheck = [url];
        } else if (url[0] === '@' && splitted.length === 2) {
            toCheck = [url];
        } else {
            toCheck = alternatives(url);
        }
        for (let i = 0, len = toCheck.length; i < len; i++) {
            const modCheck = toCheck[i];
            try {
                // use node resolution to get the full file path
                // it throws if the file does not exist.
                url = await styleResolve(modCheck, prev);
                if (url) {
                    // file found, stop the search.
                    break;
                }
            } catch (ex) {
                //
            }
        }
        if (resolved.indexOf(url) !== -1) {
            // This file has been resolved already.
            // Skip it in order to avoid duplications.
            return {
                contents: '',
            };
        }

        resolved.push(url);
        // return the found url.
        return {
            file: url,
        };
    };
}