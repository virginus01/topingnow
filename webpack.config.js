module.exports = function (webpackEnv) {


    // ...
    return {

        // ...
        module: {
            rules: [
                {
                    test: /\.js$|jsx/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-react", "@babel/preset-env"],
                        },
                    },
                },
            ]
        },

        resolve: {

            // ...
            fallback: {

                "fs": false,
                "os": false,
                "path": false,
            }
        }
    }
}