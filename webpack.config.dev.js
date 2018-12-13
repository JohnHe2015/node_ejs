const path = require('path');

module.exports = {
    entry : './index.js',
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : 'bundle.js'
    },
    
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : '/node/module/',
                use : 
                {
                    loader : 'babel-loader'
                    /*options : {
                        presets: ['env'] 
                    }*/
                }  
            },
            {
                test : /\.css$/,
                exclude : '/node/module/',
                use : 
                    ['style-loader','css-loader']
                
            },
            {
                test : /\.less$/,
                exclude : '/node/module/',
                use : 
                    ['style-loader','css-loader','less-loader']
                
            }
        ]
    },
    devServer:{
        //设置基本目录结构
        contentBase:'./',
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:8080,
        inline:true,
        hot:true
    }

}