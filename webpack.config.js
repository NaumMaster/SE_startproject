const path = require("path");
const webpack = require("webpack");

module.exports = (env) => {
    return {
        mode: env.mode ?? "development",
        entry: {
            main: path.resolve(__dirname, "src", "scripts", "main.js"),
            catalog: path.resolve(__dirname, "src", "scripts", "catalog.js"),
            global: path.resolve(__dirname, "src", "scripts", "global.js"),
        },
        output: {
            // filename: "[name].[contenthash].js",
            filename: "[name].js",
            path: path.resolve(__dirname, "www", "content", "skin", "js"),
            clean: true,
        },
        plugins: [
            // new webpack.ManifestPlugin({
            //     filename: "manifest.json",
            // }),
            new webpack.ProgressPlugin(),
        ],
    };
};
