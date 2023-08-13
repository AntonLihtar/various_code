const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 4200
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html', //выходной файл
        template: './src/index.html', //шаблон
        scriptLoading: 'blocking' //загрузка скрипта
    })],
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    }
}