const mix = require("laravel-mix");

mix
  .disableNotifications()
  .setPublicPath("www/content")
  .sourceMaps(false, "source-map")
  .version();

const postcssPlugins = [
  require("postcss-sort-media-queries")(),
  require("autoprefixer")({
    overrideBrowserslist: ["last 5 versions"],
    grid: true,
  }),
];

if (mix.inProduction()) {
  postcssPlugins.push(require("postcss-combine-duplicated-selectors")());
}

mix.options({
  postCss: postcssPlugins,
});

mix.js("dev_src/scripts", "skin/js");
mix.sass("dev_src/styles", "skin");

mix.copyDirectory("dev_src/icons", "www/content/skin/icons");

mix.browserSync({
  server: {
    baseDir: "./www/content",
    index: "home.htm",
  },
  files: [
    "./www/content/*.htm",
    "./www/content/skin/**/*.css"
  ],
});
