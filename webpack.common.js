const path = require("path");

module.exports = {
    entry: ["./public/js/index.js", "./public/sass/main.scss"],
    output: {
        filename: "js/main.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ["babel-loader"],
                exclude: [/node_modules/]
            }
        ]
    }
};
