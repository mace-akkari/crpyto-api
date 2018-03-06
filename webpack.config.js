module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
      },
    module: {
        rules: [
            {
            test:/\.css$/,
            use:[
                'style-loader',
                'css-loader'
            ]
        },
    {
        test:/\.(png|svg|jpg|gif)$/,
        use:[
            'file-loader'
        ]
       }]
},
    
};