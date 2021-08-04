import path from 'path';
import { readFile } from 'fs/promises';
import { appendSearchParam, getSearchParam, getSearchParams, hasSearchParam } from '@chialab/node-resolve';

/**
 * The filter regex for file imports.
 */
const EMIT_FILE_REGEX = /(\?|&)emit=file/;

/**
 * The namespace for emitted chunks.
 */
const EMIT_CHUNK_NS = 'emit-chunk';

/**
 * The filter regex for chunk imports.
 */
const EMIT_CHUNK_REGEX = /(\?|&)emit=chunk/;

/**
 * @typedef {Object} EmitTransformOptions
 * @property {import('esbuild').Format} [format]
 */

/**
 * Programmatically emit file reference.
 * @param {string} source The path of the file.
 */
export function emitFile(source) {
    if (hasSearchParam(source, 'emit')) {
        return source;
    }

    return appendSearchParam(source, 'emit', 'file');
}

/**
 * Programmatically emit a chunk reference.
 * @param {string} source The path of the chunk.
 * @param {EmitTransformOptions} options Esbuild transform options.
 */
export function emitChunk(source, options = {}) {
    return appendSearchParam(appendSearchParam(source, 'emit', 'chunk'), 'transform', JSON.stringify(options));
}

/**
 * Get the base uri reference.
 * @param {import('esbuild').PluginBuild} build
 */
export function getBaseUrl(build) {
    const options = build.initialOptions;

    if (options.platform === 'browser' && options.format !== 'esm') {
        return 'document.baseURI';
    }

    if (options.platform === 'node' && options.format !== 'esm') {
        return '\'file://\' + __filename';
    }

    return 'import.meta.url';
}

/**
 * @param {string} entryPoint
 * @param {string} [specifier]
 */
export function createImportStatement(entryPoint, specifier) {
    const identifier = `_${(specifier || entryPoint).split('?')[0].replace(/[^a-zA-Z0-9]/g, '_')}`;

    return {
        identifier,
        statement: `import ${identifier} from '${entryPoint}';`,
    };
}

/**
 * @param {import('@chialab/estransform').TransformData} data
 * @param {string} entryPoint
 * @param {string} [specifier]
 */
export function prependImportStatement({ magicCode, code }, entryPoint, specifier) {
    const { identifier, statement } = createImportStatement(entryPoint, specifier);
    if (code.startsWith('#!')) {
        magicCode.appendRight(code.indexOf('\n') + 1, `${statement}\n`);
    } else {
        magicCode.prepend(`${statement}\n`);
    }

    return { identifier, statement };
}

/**
 * Extract esbuild transform options for the chunk endpoint.
 * @param {string} entryPoint
 * @return {EmitTransformOptions}
 */
export function getChunkOptions(entryPoint) {
    const transform = getSearchParam(entryPoint, 'transform') || '{}';
    return JSON.parse(transform);
}

/**
 * @param {typeof import('esbuild')} [esbuild]
 * @return An esbuild plugin.
 */
export default function(esbuild) {
    /**
     * @type {import('esbuild').Plugin}
     */
    const plugin = {
        name: 'emitter',
        setup(build) {
            const options = build.initialOptions;
            const outdir = options.outdir || path.dirname(/** @type {string} */(options.outfile));

            build.onResolve({ filter: EMIT_FILE_REGEX }, (args) => ({
                path: getSearchParams(args.path).path,
            }));

            build.onResolve({ filter: EMIT_CHUNK_REGEX }, (args) => ({
                path: getSearchParams(args.path).path,
                namespace: EMIT_CHUNK_NS,
                pluginData: getChunkOptions(args.path),
            }));

            build.onLoad({ filter: /./, namespace: EMIT_CHUNK_NS }, async ({ path: filePath, pluginData }) => {
                esbuild = esbuild || await import('esbuild');

                /** @type {import('esbuild').BuildOptions} */
                const config = {
                    ...options,
                    ...pluginData,
                    entryPoints: [filePath],
                    outfile: undefined,
                    outdir,
                    metafile: true,
                };

                const result = await esbuild.build(config);
                if (result.metafile) {
                    const outputs = result.metafile.outputs;
                    const outputFiles = Object.keys(outputs);
                    filePath = outputFiles
                        .filter((output) => !output.endsWith('.map'))
                        .filter((output) => outputs[output].entryPoint)
                        .find((output) => filePath === path.resolve(/** @type {string} */(outputs[output].entryPoint))) || outputFiles[0];
                }

                return {
                    contents: await readFile(filePath),
                    loader: 'file',
                };
            });
        },
    };

    return plugin;
}