import { defineUntypedSchema } from 'untyped'
import { defu } from 'defu'
import { resolve } from 'pathe'
import type { AppHeadMetaObject } from '../types/head'

export default defineUntypedSchema({
  /**
   * Vue.js config
   */
  vue: {
    /** @type {typeof import('@vue/compiler-sfc').AssetURLTagConfig} */
    transformAssetUrls: {
      video: ['src', 'poster'],
      source: ['src'],
      img: ['src'],
      image: ['xlink:href', 'href'],
      use: ['xlink:href', 'href'],
    },
    /**
     * Options for the Vue compiler that will be passed at build time.
     * @see [Vue documentation](https://ru.vuejs.org/api/application.html#app-config-compileroptions)
     * @type {typeof import('@vue/compiler-core').CompilerOptions}
     */
    compilerOptions: {},

    /**
     * Include Vue compiler in runtime bundle.
     */
    runtimeCompiler: {
      $resolve: async (val, get) => val ?? await get('experimental.runtimeVueCompiler') ?? false,
    },

    /**
     * Enable reactive destructure for `defineProps`
     * @type {boolean}
     */
    propsDestructure: true,

    /**
     * It is possible to pass configure the Vue app globally. Only serializable options
     * may be set in your `nuxt.config`. All other options should be set at runtime in a Nuxt plugin..
     * @see [Vue app config documentation](https://vuejs.org/api/application.html#app-config)
     */
    config: undefined,
  },

  /**
   * Nuxt App configuration.
   */
  app: {
    /**
     * The base path of your Nuxt application.
     *
     * For example:
     * @example
     * ```ts
     * export default defineNuxtConfig({
     *   app: {
     *     baseURL: '/prefix/'
     *   }
     * })
     * ```
     *
     * This can also be set at runtime by setting the NUXT_APP_BASE_URL environment variable.
     * @example
     * ```bash
     * NUXT_APP_BASE_URL=/prefix/ node .output/server/index.mjs
     * ```
     */
    baseURL: {
      $resolve: val => val || process.env.NUXT_APP_BASE_URL || '/',
    },

    /** The folder name for the built site assets, relative to `baseURL` (or `cdnURL` if set). This is set at build time and should not be customized at runtime. */
    buildAssetsDir: {
      $resolve: val => val || process.env.NUXT_APP_BUILD_ASSETS_DIR || '/_nuxt/',
    },

    /**
     * An absolute URL to serve the public folder from (production-only).
     *
     * For example:
     * @example
     * ```ts
     * export default defineNuxtConfig({
     *   app: {
     *     cdnURL: 'https://mycdn.org/'
     *   }
     * })
     * ```
     *
     * This can be set to a different value at runtime by setting the `NUXT_APP_CDN_URL` environment variable.
     * @example
     * ```bash
     * NUXT_APP_CDN_URL=https://mycdn.org/ node .output/server/index.mjs
     * ```
     */
    cdnURL: {
      $resolve: async (val, get) => (await get('dev')) ? '' : (process.env.NUXT_APP_CDN_URL ?? val) || '',
    },

    /**
     * Set default configuration for `<head>` on every page.
     * @example
     * ```js
     * app: {
     *   head: {
     *     meta: [
     *       // <meta name="viewport" content="width=device-width, initial-scale=1">
     *       { name: 'viewport', content: 'width=device-width, initial-scale=1' }
     *     ],
     *     script: [
     *       // <script src="https://myawesome-lib.js"></script>
     *       { src: 'https://awesome-lib.js' }
     *     ],
     *     link: [
     *       // <link rel="stylesheet" href="https://myawesome-lib.css">
     *       { rel: 'stylesheet', href: 'https://awesome-lib.css' }
     *     ],
     *     // please note that this is an area that is likely to change
     *     style: [
     *       // <style type="text/css">:root { color: red }</style>
     *       { children: ':root { color: red }', type: 'text/css' }
     *     ],
     *     noscript: [
     *       // <noscript>JavaScript is required</noscript>
     *       { children: 'JavaScript is required' }
     *     ]
     *   }
     * }
     * ```
     * @type {typeof import('../src/types/config').NuxtAppConfig['head']}
     */
    head: {
      $resolve: async (val: Partial<AppHeadMetaObject> | undefined, get) => {
        const resolved = defu(val, await get('meta') as Partial<AppHeadMetaObject>, {
          meta: [],
          link: [],
          style: [],
          script: [],
          noscript: [],
        } as Required<Pick<AppHeadMetaObject, 'meta' | 'link' | 'style' | 'script' | 'noscript'>>)

        // provides default charset and viewport if not set
        if (!resolved.meta.find(m => m.charset)?.charset) {
          resolved.meta.unshift({ charset: resolved.charset || 'utf-8' })
        }
        if (!resolved.meta.find(m => m.name === 'viewport')?.content) {
          resolved.meta.unshift({ name: 'viewport', content: resolved.viewport || 'width=device-width, initial-scale=1' })
        }

        resolved.meta = resolved.meta.filter(Boolean)
        resolved.link = resolved.link.filter(Boolean)
        resolved.style = resolved.style.filter(Boolean)
        resolved.script = resolved.script.filter(Boolean)
        resolved.noscript = resolved.noscript.filter(Boolean)

        return resolved
      },
    },

    /**
     * Default values for layout transitions.
     *
     * This can be overridden with `definePageMeta` on an individual page.
     * Only JSON-serializable values are allowed.
     * @see [Vue Transition docs](https://ru.vuejs.org/api/built-in-components.html#transition)
     * @type {typeof import('../src/types/config').NuxtAppConfig['layoutTransition']}
     */
    layoutTransition: false,

    /**
     * Default values for page transitions.
     *
     * This can be overridden with `definePageMeta` on an individual page.
     * Only JSON-serializable values are allowed.
     * @see [Vue Transition docs](https://ru.vuejs.org/api/built-in-components.html#transition)
     * @type {typeof import('../src/types/config').NuxtAppConfig['pageTransition']}
     */
    pageTransition: false,

    /**
     * Default values for view transitions.
     *
     * This only has an effect when **experimental** support for View Transitions is
     * [enabled in your nuxt.config file](/docs/getting-started/transitions#view-transitions-api-experimental).
     *
     * This can be overridden with `definePageMeta` on an individual page.
     * @see [Nuxt View Transition API docs](https://nuxt.com/docs/getting-started/transitions#view-transitions-api-experimental)
     * @type {typeof import('../src/types/config').NuxtAppConfig['viewTransition']}
     */
    viewTransition: {
      $resolve: async (val, get) => val ?? await (get('experimental') as Promise<Record<string, any>>).then(
        e => e?.viewTransition,
      ) ?? false,
    },

    /**
     * Default values for KeepAlive configuration between pages.
     *
     * This can be overridden with `definePageMeta` on an individual page.
     * Only JSON-serializable values are allowed.
     * @see [Vue KeepAlive](https://ru.vuejs.org/api/built-in-components.html#keepalive)
     * @type {typeof import('../src/types/config').NuxtAppConfig['keepalive']}
     */
    keepalive: false,

    /**
     * Customize Nuxt root element id.
     * @type {string | false}
     * @deprecated Prefer `rootAttrs.id` instead
     */
    rootId: {
      $resolve: val => val === false ? false : (val || '__nuxt'),
    },

    /**
     * Customize Nuxt root element tag.
     */
    rootTag: {
      $resolve: val => val || 'div',
    },

    /**
     * Customize Nuxt root element id.
     * @type {typeof import('@unhead/schema').HtmlAttributes}
     */
    rootAttrs: {
      $resolve: async (val: undefined | null | Record<string, unknown>, get) => {
        const rootId = await get('app.rootId')
        return defu(val, {
          id: rootId === false ? undefined : (rootId || '__nuxt'),
        })
      },
    },

    /**
     * Customize Nuxt Teleport element tag.
     */
    teleportTag: {
      $resolve: val => val || 'div',
    },

    /**
     * Customize Nuxt Teleport element id.
     * @type {string | false}
     * @deprecated Prefer `teleportAttrs.id` instead
     */
    teleportId: {
      $resolve: val => val === false ? false : (val || 'teleports'),
    },

    /**
     * Customize Nuxt Teleport element attributes.
     * @type {typeof import('@unhead/schema').HtmlAttributes}
     */
    teleportAttrs: {
      $resolve: async (val: undefined | null | Record<string, unknown>, get) => {
        const teleportId = await get('app.teleportId')
        return defu(val, {
          id: teleportId === false ? undefined : (teleportId || 'teleports'),
        })
      },
    },

    /**
     * Customize Nuxt SpaLoader element tag.
     */
    spaLoaderTag: {
      $resolve: val => val || 'div',
    },

    /**
     * Customize Nuxt Nuxt SpaLoader element attributes.
     * @type {typeof import('@unhead/schema').HtmlAttributes}
     */
    spaLoaderAttrs: {
      id: '__nuxt-loader',
    },
  },

  /**
   * Boolean or a path to an HTML file with the contents of which will be inserted into any HTML page
   * rendered with `ssr: false`.
   *
   * - If it is unset, it will use `~/app/spa-loading-template.html` file in one of your layers, if it exists.
   * - If it is false, no SPA loading indicator will be loaded.
   * - If true, Nuxt will look for `~/app/spa-loading-template.html` file in one of your layers, or a
   *   default Nuxt image will be used.
   *
   * Some good sources for spinners are [SpinKit](https://github.com/tobiasahlin/SpinKit) or [SVG Spinners](https://icones.js.org/collection/svg-spinners).
   * @example ~/app/spa-loading-template.html
   * ```html
   * <!-- https://github.com/barelyhuman/snips/blob/dev/pages/css-loader.md -->
   * <div class="loader"></div>
   * <style>
   * .loader {
   *   display: block;
   *   position: fixed;
   *   z-index: 1031;
   *   top: 50%;
   *   left: 50%;
   *   transform: translate(-50%, -50%);
   *   width: 18px;
   *   height: 18px;
   *   box-sizing: border-box;
   *   border: solid 2px transparent;
   *   border-top-color: #000;
   *   border-left-color: #000;
   *   border-bottom-color: #efefef;
   *   border-right-color: #efefef;
   *   border-radius: 50%;
   *   -webkit-animation: loader 400ms linear infinite;
   *   animation: loader 400ms linear infinite;
   * }
   *
   * @-webkit-keyframes loader {
   *   0% {
   *     -webkit-transform: translate(-50%, -50%) rotate(0deg);
   *   }
   *   100% {
   *     -webkit-transform: translate(-50%, -50%) rotate(360deg);
   *   }
   * }
   * @keyframes loader {
   *   0% {
   *     transform: translate(-50%, -50%) rotate(0deg);
   *   }
   *   100% {
   *     transform: translate(-50%, -50%) rotate(360deg);
   *   }
   * }
   * </style>
   * ```
   * @type {string | boolean}
   */
  spaLoadingTemplate: {
    $resolve: async (val: string | boolean | undefined, get) => typeof val === 'string' ? resolve(await get('srcDir') as string, val) : val ?? null,
  },

  /**
   * An array of nuxt app plugins.
   *
   * Each plugin can be a string (which can be an absolute or relative path to a file).
   * If it ends with `.client` or `.server` then it will be automatically loaded only
   * in the appropriate context.
   *
   * It can also be an object with `src` and `mode` keys.
   * @note Plugins are also auto-registered from the `~/plugins` directory
   * and these plugins do not need to be listed in `nuxt.config` unless you
   * need to customize their order. All plugins are deduplicated by their src path.
   * @see [`plugins/` directory documentation](https://nuxt.com/docs/guide/directory-structure/plugins)
   * @example
   * ```js
   * plugins: [
   *   '~/plugins/foo.client.js', // only in client side
   *   '~/plugins/bar.server.js', // only in server side
   *   '~/plugins/baz.js', // both client & server
   *   { src: '~/plugins/both-sides.js' },
   *   { src: '~/plugins/client-only.js', mode: 'client' }, // only on client side
   *   { src: '~/plugins/server-only.js', mode: 'server' } // only on server side
   * ]
   * ```
   * @type {(typeof import('../src/types/nuxt').NuxtPlugin | string)[]}
   */
  plugins: [],

  /**
   * You can define the CSS files/modules/libraries you want to set globally
   * (included in every page).
   *
   * Nuxt will automatically guess the file type by its extension and use the
   * appropriate pre-processor. You will still need to install the required
   * loader if you need to use them.
   * @example
   * ```js
   * css: [
   *   // Load a Node.js module directly (here it's a Sass file).
   *   'bulma',
   *   // CSS file in the project
   *   '~/assets/css/main.css',
   *   // SCSS file in the project
   *   '~/assets/css/main.scss'
   * ]
   * ```
   * @type {string[]}
   */
  css: {
    $resolve: (val: string[] | undefined) => (val ?? []).map((c: any) => c.src || c),
  },

  /**
   * An object that allows us to configure the `unhead` nuxt module.
   */
  unhead: {
    /**
     * An object that will be passed to `renderSSRHead` to customize the output.
     *
     * @see [`unhead` options documentation](https://unhead.unjs.io/setup/ssr/installation#options)
     *
     * @example
     * ```ts
     * export default defineNuxtConfig({
     *  unhead: {
     *   renderSSRHeadOptions: {
     *    omitLineBreaks: true
     *   }
     * })
     * ```
     * @type {typeof import('@unhead/schema').RenderSSRHeadOptions}
     */
    renderSSRHeadOptions: {
      $resolve: async (val: Record<string, unknown> | undefined, get) => {
        const isV4 = ((await get('future') as Record<string, unknown>).compatibilityVersion === 4)

        return defu(val, {
          omitLineBreaks: isV4,
        })
      },
    },
  },
})
