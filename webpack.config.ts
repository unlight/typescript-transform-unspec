const unspecTransformer = require('./src/index');

module.exports = async (options) => ({
    entry: {
        example: `${__dirname}/src/example.ts`,
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: 'source-map-loader',
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: program => ({
                            before: [
                                unspecTransformer(program),
                            ]
                        }),
                    },
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    devServer: {
        contentBase: `${__dirname}/dist`,
    },
    plugins: [
    ]
});
