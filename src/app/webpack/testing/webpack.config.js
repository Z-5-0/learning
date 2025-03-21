// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/index.js",     // az entry point közös
        vendor: "./src/vendor.js",  // újabb közös entry point
        empty: "./src/empty.js"     // csak teszt
    },
    // plugins: [new HtmlWebpackPlugin({
    //     template: "./src/template.html"
    // })],
    module: {
        rules: [
            {
                test: /\.html$/, // az összes .html-lel végződő fájl
                use: ["html-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: "imgs/[name].[hash][ext]"  // ez az outputPath helyett van
                }
            }
        ]
    }
}