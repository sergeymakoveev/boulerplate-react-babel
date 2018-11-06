import autoprefixer from 'autoprefixer';
// import stylelint from 'stylelint';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';
import WebpackNotifierPlugin from 'webpack-notifier';


const DEV = process.env.NODE_ENV !== 'production';
const DIR = __dirname;
const DIR_NODE_MODULES = `${DIR}/node_modules`;
const DIR_SRC = `${DIR}/src`;
const DIR_SRC_PAGES = `${DIR_SRC}/pages`;
// const DIR_SRC_EXTERNALS = `${DIR_SRC}/externals`;
const DIR_PUBLIC = '/';
const DIR_DIST = `${DIR}/dist`;

// // noParse:  wrapRegexp(/\/node_modules\/(angular\/angular)/, 'noParse')
// function wrapRegexp(regexp, label) {
//     regexp.test = function(path) {
//         console.log(`[${label}]: ${path}`);
//         return RegExp.prototype.test.call(this, path);
//     };
//     return regexp;
// }


export default {

    context: DIR_SRC,

    // watch: DEV,
    devtool: DEV ? 'inline-source-map' : false,

    entry: {
        // ...( DEV ? { test: `${DIR_SRC_PAGES}/test` } : {} ),
        index: `${DIR_SRC_PAGES}/index.jsx`,
    },

    output: {
        path: DIR_DIST,
        publicPath: DIR_PUBLIC,
        filename: '[name].entry.js',
        library: '[name]',
    },

    // Проброс внешних библиотек в виде виртуальных npm-пакетов
    // использование: import $ from jquery
    // externals: {
    //     jquery: '$',
    // },

    plugins: [
        new StyleLintPlugin({ syntax: 'scss' }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ name: 'common' }),
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        DEV
            ? new WebpackNotifierPlugin({ alwaysNotify: true })
            : new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false, drop_console: true },
            }),
        // Импорт npm-модулей в глобальную область видимости
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // })
    ].filter((p) => p),

    resolve: {
        modules: [DIR_NODE_MODULES, DIR_SRC],
        extensions: ['.json', '.js', '.jsx', '.scss', '.css'],
    },

    module: {

        // для ускорения сборки
        // wrapRegexp(/\/node_modules\/moment/, 'noParse')
        noParse: [/\/node_modules\/moment\/moment\.js/],

        rules: [
            // {
            //     test: /\.json$/,
            //     enforce: 'pre',
            //     use: 'tslint-loader',
            //     include: DIR_SRC,
            //     exclude: DIR_SRC_EXTERNALS
            // },
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                include: DIR_SRC,
            },
            // {
            //     test: /\.scss$/,
            //     include: DIR_SRC,
            //     enforce: 'pre',
            //     use: [{
            //         loader: 'postcss-loader',
            //         options: {
            //             plugins: [stylelint]
            //         }
            //     }]
            // },
            {
                test: /\.js$/,
                include: DIR_SRC,
                loader: 'babel-loader',
                // query: {
                //     presets: [
                //         // it set in .babelrc
                //         '@babel/preset-env',
                //     ],
                // },
            },
            {
                test: /\.jsx$/,
                include: DIR_SRC,
                loader: 'babel-loader',
                query: {
                    presets: [
                        // it set in .babelrc
                        // '@babel/preset-env',
                        '@babel/preset-react',
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                    ],
                },
            },
            {
                test: /\.css$/,
                use: (
                    (sourceMap) => ([
                        'style-loader',
                        `css-loader?sourceMap=${sourceMap}`,
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap,
                                plugins: [autoprefixer],
                            },
                        },
                    ])
                )(DEV),
            },
            {
                test: /\.scss$/,
                use: (
                    (sourceMap) => ([
                        'style-loader',
                        `css-loader?sourceMap=${sourceMap}`,
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap,
                                plugins: [autoprefixer],
                            },
                        },
                        `sass-loader?sourceMap=${sourceMap}`,
                    ])
                )(DEV),
            },
            {
                test: /\.(gif|png|jpg|svg|ttf|eot|woff|woff2)$/,
                use: 'url-loader?name=[path][name].[ext]?[hash]&limit=4096',
            },
            {
                test: /\.ico$/,
                use: 'file-loader?name=[name].[ext]?[hash]',
            },
            {
                test: /\.html$/,
                use: [
                    // eslint-disable-next-line no-useless-escape
                    'file-loader?name=[1].html?[hash]&regExp=pages/(.+)\.html$',
                    'extract-loader',
                    {
                        loader: 'html-loader',
                        options: { attrs: ['img:src', 'link:href'] },
                    },
                ],
            },
        ],
    },

    devServer: {
        port: 8888,
        historyApiFallback: {
            rewrites: [
                // { from: /^\/js/, to: '/js' },
                { from: /./, to: '/' },
            ],
        },
        proxy: {
            '/api': 'http://localhost:3333',
        },
        host: '0.0.0.0',
    },

};
