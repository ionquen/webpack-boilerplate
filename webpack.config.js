const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = (env, argv) => {
    const config =  {
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: './public/index.html'
            }),
            new WebpackNotifierPlugin({ 
                alwaysNotify: false 
            }),
            new CopyWebpackPlugin({
                patterns: [{
                    from: "public",
                    to: "",
                    globOptions: {
                      ignore: ["**/index.html"],
                    },
                }]
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, "build"),
            compress: true,
            port: 8080,
            watchContentBase: true,
            progress: true,
            hot: true,
            open: true,
            historyApiFallback: true,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            alias: {
                Components: path.resolve(__dirname, 'src/components/'),
                Styl: path.resolve(__dirname, 'src/styl/'),
                Img: path.resolve(__dirname, 'src/img/'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: ["ts-loader"],
                },
                {
                    test: /\.styl$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        "css-modules-typescript-loader",
                        {
                            loader: "css-loader",
                            options: { modules: true }
                        },
                        {
                            loader: "stylus-loader"
                        },
                    ],
                },
            ]
        },
        entry: {
            main: './src/index.tsx',
        },
        output: {
            filename: (argv.liveReload || false) ? 'assets/[name].[hash].js' : 'assets/[name].[chunkhash].js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
        },
        performance: {
            hints: false,
        },
        optimization: {
            minimize: true,
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: 'vendors',
                        test: /node_modules/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
            minimizer: [new TerserPlugin({
                parallel: true,
            })],
        },
    }
    if (argv.mode==="production") config.plugins.push(new CleanWebpackPlugin())
    return config
}