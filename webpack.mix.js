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
  proxy: "localhost:8000",
  open: false,
  notify: false,
  files: ["www/content/**/*.html"],
});

mix.copyDirectory("dev_src/static", "www/content/skin")
mix.js('dev_src/js/main.js', 'js')
mix.sass('dev_src/styles/main.scss', 'css')