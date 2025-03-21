const path = require("path");
const common = require("./webpack.config");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, { // egyesítsd a common  tartalmát az objektumban lévőkkel
    mode: "development",
    output: {
        filename: "[name].bundle.js", // korábbi: filename: "main.js"
        path: path.resolve(__dirname, "dist"),
        clean: true, // automatikusan törli a kimeneti mappa korábbi tartalmát
    },
    devServer: {
        compress: true, // engedélyezi a Gzip tömörítést
        hot: true, // HMR bekapcsolva
        port: 9000, // live szerver portja
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // harmadik
                    "css-loader", // második
                    "sass-loader" // első
                ]
            },
        ]
    }
})