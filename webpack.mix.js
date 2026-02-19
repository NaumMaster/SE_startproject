const mix = require("laravel-mix");

mix.disableNotifications();
mix.setPublicPath("www/content/skin");
mix.sourceMaps(false, "source-map");
mix.extract();
mix.version();

const postcssPlugins = [require("postcss-sort-media-queries")()];

if (mix.inProduction()) {
  postcssPlugins.push(require("postcss-combine-buplicated-selectors")());
}

mix.options({
  postCss: postcssPlugins,
});

mix.browserSync({
  //  proxy: "localhost:8000",
  server: {
    baseDir: "./www/content",
    index: "home.htm",
  },
  files: ["./www/content/*.htm", "./www/content/skin/**/*.css"],
});

mix.copyDirectory("dev_src/icons", "www/content/skin/css");
mix.js("dev_src/scripts/main.js", "www/content/skin");
mix.sass("dev_src/styles/kakaha.scss", "www/content/skin/css");
