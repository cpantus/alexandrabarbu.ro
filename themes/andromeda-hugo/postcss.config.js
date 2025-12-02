const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./hugo_stats.json"],
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
    // Animation and transition states
    /^aos-/,
    /^animate-/,
    // Form states
    /^valid$/,
    /^invalid$/,
    /^touched$/,
    /^pristine$/,
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
