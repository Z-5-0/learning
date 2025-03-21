const path = require("path");
const common = require("./webpack.config");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // named import
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // default import
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, { // egyesítsd a common  tartalmát az objektumban lévőkkel
    mode: "production",
    output: {
        filename: "[name].[contenthash].bundle.js", // korábbi: filename: "main.[contenthash].js"
        path: path.resolve(__dirname, "dist"),
        clean: true, // automatikusan törli a kimeneti mappa korábbi tartalmát
    },
    // plugins: [new CleanWebpackPlugin()]
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            minify: {
                removeComments: true,         // eltávolítja a kommenteket
                removeAttributeQuotes: true,  // eltávolítja az idézőjeleket az attribútumokból, amennyiben nem szükségesek
                collapseWhitespace: true      // eltávolítja a felesleges szóközöket, és sortöréseket, hogy kisebb legyen a fájl
            }
        }),
        new MiniCssExtractPlugin(
            {
                filename: "[name].[contenthash].css"
            }
        )],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // harmadik - kiszedi fájlokba a CSS-t
                    "css-loader", // második
                    "sass-loader" // első
                ]
            },
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),   // CSS minifikálást
            new TerserPlugin(),         // JS minifikálást
        ]
    },
})