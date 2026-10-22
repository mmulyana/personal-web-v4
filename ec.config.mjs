import { defineEcConfig } from 'astro-expressive-code'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

export default defineEcConfig({
  defaultLocale: 'zh-CN',
  defaultProps: {
    wrap: false,
    collapseStyle: 'collapsible-auto',
    showLineNumbers: false,
    preserveIndent: true,
  },
  minSyntaxHighlightingColorContrast: 0,

  styleOverrides: {
    uiFontFamily: 'var(--font-sans)',
    uiFontSize: '1em',
    codeFontFamily: 'var(--font-mono)',
    codeFontSize: '0.9375rem',
    codeLineHeight: '1.4',
    borderRadius: '0',
    codePaddingBlock: '0.8571429em',
    codePaddingInline: '1.1428571em',
    borderWidth: '0px',

    frames: {
      frameBoxShadowCssValue: false,
      inlineButtonBackgroundActiveOpacity: '0.2',
      inlineButtonBackgroundHoverOrFocusOpacity: '0.1',
    },
    textMarkers: {
      backgroundOpacity: '0.2',
      borderOpacity: '0.4',
    },
  },

  plugins: [
    pluginCollapsibleSections({
      defaultCollapsed: false,
    }),
    pluginLineNumbers(),
  ],

  themes: ['github-dark'],
  useDarkModeMediaQuery: false,
  useStyleReset: false,
})
