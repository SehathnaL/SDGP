const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    "crypto": require.resolve("crypto-browserify"),
                    "stream": require.resolve("stream-browserify"),
                    "assert": require.resolve("assert/"),
                    "http": require.resolve("stream-http"),
                    "https": require.resolve("https-browserify"),
                    "url": require.resolve("url/"),
                    "util": require.resolve("util/"),
                    "zlib": require.resolve("browserify-zlib")
                }
            },
            plugins: [
                new webpack.ProvidePlugin({
                    process: 'process/browser',
                    Buffer: ['buffer', 'Buffer']
                })
            ],
            ignoreWarnings: [/Failed to parse source map/],
            module: {
                rules: [
                    {
                        test: /\.(js|mjs|jsx)$/,
                        enforce: 'pre',
                        use: ['source-map-loader'],
                    }
                ]
            }
        }
    }
};