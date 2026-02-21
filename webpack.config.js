const path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = (env) => {
    const isDev = env.mode === "development";

    return {
        mode: env.mode ?? "development",
        entry: {
            main: path.resolve(__dirname, "src", "scripts", "main.js"),
            // catalog: path.resolve(__dirname, "src", "scripts", "catalog.js"),
            // global: path.resolve(__dirname, "src", "scripts", "global.js"),
        },
        devtool: isDev ? "inline-source-map" : false,
        output: {
            filename: isDev ? "[name].js" : "[name].[contenthash].js",
            path: path.resolve(__dirname, "www", "content", "skin", "source"),
            assetModuleFilename: "[name][ext]",
        },
        plugins: [
            !isDev &&
                new webpack.ManifestPlugin({
                    filename: "manifest.json",
                }),
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),
            new FileManagerPlugin({
                events: {
                    onStart: {
                        delete: [
                            path.resolve(
                                __dirname,
                                "www",
                                "content",
                                "skin",
                                "source"
                            ),
                            path.resolve(
                                __dirname,
                                "www",
                                "content",
                                "skin",
                                "images_opt"
                            ),
                        ],
                    },
                    onEnd: {
                        copy: [
                            {
                                source: path.join("src", "static"),
                                destination: path.resolve(
                                    __dirname,
                                    "www",
                                    "content",
                                    "skin",
                                    "source"
                                ),
                            },
                            {
                                source: path.resolve(
                                    __dirname,
                                    "www",
                                    "content",
                                    "images"
                                ),
                                destination: path.resolve(
                                    __dirname,
                                    "www",
                                    "content",
                                    "skin",
                                    "images_opt"
                                ),
                            },
                        ],
                    },
                },
            }),
        ],
        devServer: {
            static: {
                directory: path.resolve(__dirname, "www", "content"),
                watch: true,
            },
            port: 5000,
            open: true,
            watchFiles: [
                path.join(__dirname, "src"),
                path.join(__dirname, "www", "content"),
            ],
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: "babel-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.svg$/,
                    type: "asset/resource",
                    generator: {
                        filename: path.join(
                            "icons",
                            "[name].[contenthash][ext]"
                        ),
                    },
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/i,
                    type: "asset/resource",
                },
            ],
        },
        optimization: {
            minimizer: [
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminMinify,
                        options: {
                            plugins: [
                                ["gifsicle", { interlaced: true }],
                                ["jpegtran", { progressive: true }],
                                ["optipng", { optimizationLevel: 5 }],
                                ["svgo", { name: "preset-default" }],
                            ],
                        },
                    },
                }),
                new ImageminWebpWebpackPlugin(),
            ],
        },
    };
};
