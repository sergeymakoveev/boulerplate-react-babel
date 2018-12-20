import autoprefixer from 'autoprefixer';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';


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
    mode: DEV ? 'development' : 'production',
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

    optimization: {
        // noEmitOnErrors: false,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: 'verbose',
                        drop_console: true,
                        drop_debugger: true,
                    },
                },
            }),
        ],
    },

    plugins: [
        new StyleLintPlugin({ syntax: 'scss' }),
        ...(
            DEV
                ? [new WebpackNotifierPlugin({ alwaysNotify: true })]
                : []
        ),
        // Импорт npm-модулей в глобальную область видимости
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // })
    ].filter((p) => p),

    resolve: {
        modules: [DIR_NODE_MODULES, DIR_SRC],
        extensions: ['.json', '.js', '.jsx', '.scss', '.css'],
        alias: { '~': DIR_SRC },
    },

    module: {

        // для ускорения сборки
        // wrapRegexp(/\/node_modules\/moment/, 'noParse')
        noParse: [/\/node_modules\/moment\/moment\.js/],

        rules: [
            // {
            //     enforce: 'pre',
            //     include: DIR_SRC,
            //     test: /\.json$/,
            //     use: 'eslint-loader',
            // },
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                include: DIR_SRC,
                use: 'eslint-loader',
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
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                    },
                },
            },
            {
                test: /\.jsx$/,
                include: DIR_SRC,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                    },
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
        // before: (app) => {
        //     app.use((req, res, next) => {
        //         console.log(`${req.method} ${req.url}`);
        //         next();
        //     });
        // },
        historyApiFallback: {
            rewrites: [
                // { from: /^\/js/, to: '/js' },
                { from: /./, to: '/' },
            ],
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                pathRewrite: { '^/api': '' },
                logLevel: 'debug',
                // bypass: (req, res, proxyOptions) => {
                // https://www.npmjs.com/package/json-stringify-safe
                // https://www.npmjs.com/package/fx
                //     console.log(`${req.method} ${req.url}`);
                //     fx(JSON.parse(json_stringify_safe(res)));
                // },
            },
        },
        host: '0.0.0.0',
    },

};
