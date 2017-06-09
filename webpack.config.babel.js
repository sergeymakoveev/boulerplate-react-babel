import webpack from 'webpack';
import WebpackNotifierPlugin from 'webpack-notifier';


const DEV = process.env.NODE_ENV != 'production',
      DIR = __dirname,
      DIR_SRC = `${DIR}/src`,
      DIR_SRC_PAGES = `${DIR_SRC}/pages`,
      DIR_SRC_EXTERNALS = `${DIR_SRC}/externals`,
      DIR_PUBLIC = '/',
      DIR_DIST = `${DIR}/dist`;

//// noParse:  wrapRegexp(/\/node_modules\/(angular\/angular)/, 'noParse')
function wrapRegexp(regexp, label) {
    regexp.test = function(path) {
        console.log(`[${label}]: ${path}`);
        return RegExp.prototype.test.call(this, path);
    };
    return regexp;
}


export default {

    // watch: DEV,

    devtool: DEV ? 'inline-source-map' : false,

    context: DIR_SRC,

    entry: {
        ...( DEV ? { test: `${DIR_SRC_PAGES}/test` } : {} ),
        index: `${DIR_SRC_PAGES}/index`
    },

    output: {
        path: DIR_DIST,
        publicPath: DIR_PUBLIC,
        filename: '[name].entry.js',
        library: '[name]'
    },

    // Проброс внешних библиотек в виде виртуальных npm-пакетов
    // использование: import $ from jquery
    // externals: {
    //     jquery: '$',
    // },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ name: 'common' }),
        DEV ? new WebpackNotifierPlugin({alwaysNotify: true})
            : new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false,
                                                                drop_console: true } }),
        // Импорт npm-модулей в глобальную область видимости
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // })
    ].filter( p => p ),

    resolve: {
        modules: [DIR_SRC, 'node_modules']
    },

    module: {

        // для ускорения сборки
        // wrapRegexp(/\/node_modules\/moment/, 'noParse')
        noParse: [ /\/node_modules\/moment\/moment\.js/ ],

        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: 'eslint-loader',
                include: DIR_SRC,
                exclude: DIR_SRC_EXTERNALS
            },
            {
                test: /\.js$/,
                // exclude: /\/node_modules|bower_components\//,
                include: DIR_SRC,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                use: DEV ? ['style-loader', 'css-loader?sourceMap']
                         : ['style-loader','css-loader!autoprefixer']
            },
            {
                test: /\.scss$/,
                use: DEV ? ['style-loader', 'css-loader?sourceMap=true', 'sass-loader?sourceMap=true']
                         : ['style-loader', 'css-loader', 'autoprefixer!resolve-url!sass?sourceMap']
            },
            {
                test: /\.(gif|png|jpg|svg|ttf|eot|woff|woff2)$/,
                use: 'url-loader?name=[path][name].[ext]?[hash]&limit=4096'
            },
            {
                test: /\.ico$/,
                use: 'file-loader?name=[name].[ext]?[hash]'
            },
            {
                test: /\.html$/,
                use: [
                    'file-loader?name=[1].html?[hash]&regExp=pages/(.+)\.html$',
                    'extract-loader',
                    { loader: 'html-loader',
                      options: { attrs: ['img:src', 'link:href'] } }
                ]
            }
        ]
    },

    devServer: {
        // port: 3001,
        // proxy: {
        //     '*': 'http://localhost:8888'
        // },
        host: '0.0.0.0'
    }

};
