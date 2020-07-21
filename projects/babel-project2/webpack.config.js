var path = require("path");
module.exports = { 
    entry: './src/index.js', 
    output: { 
        path: path.resolve(__dirname,"lib"), 
        filename: 'index.compiled.js', 
    }, 
    module: { 
      rules: [{ 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: 'babel-loader',
            query:{
                presets:["env", "stage-0"]
            } 
        }] 
    } 
} 