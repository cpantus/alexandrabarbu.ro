const purgecss = require("@fullhuman/postcss-purgecss")({
  // Look for hugo_stats.json at project root (2 levels up from theme)
  content: ["./hugo_stats.json", "../../hugo_stats.json"],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
  },
  safelist: [
    /dark/,
    /^swiper-/,
    /collapsing/,
    /show/,
    /[aria-expanded=true]/,
    /[aria-expanded=false]/,
    /^lb-/,
    /^gl/,
    /^go/,
    /^gc/,
    /^gs/,
    /^gi/,
    /^desc/,
    /^zoom/,
    /dragging/,
    /fullscreen/,
    /loaded/,
    /visible/,
    /current/,
    /active/,
    // State classes for interactive components
    /^is-/,
    /^has-/,
    /--open$/,
    /--active$/,
    /--visible$/,
    /--loading$/,
    /--expanded$/,
    /--end$/,
    /--scrolled$/,
    /collapsed/,
    // Animation and transition states
    /^aos-/,
    /^animate-/,
    // Form states
    /^valid$/,
    /^invalid$/,
    /^touched$/,
    /^pristine$/,
    // Line Awesome icons (external font library)
    /^la$/,
    /^la-/,
    /^lab$/,
    /^las$/,
    /^lar$/,
    /^lad$/,
    // Screen reader utilities
    /^sr-only$/,
    // Dropdown utilities (Bootstrap-like)
    /dropdown-menu-end/,
  ],
});

const cssnano = require("cssnano")({
  preset: ["default", {
    discardComments: { removeAll: true },
    normalizeWhitespace: true,
    minifyFontValues: { removeQuotes: false },
    // Preserve calc() functions as-is
    calc: false,
  }],
});

module.exports = {
  plugins: [
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss, cssnano] : []),
  ],
};
