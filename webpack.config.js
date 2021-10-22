const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')//생성자 함수이름 이므로 파스칼 표기법
const CopyPlugin = require('copy-webpack-plugin')//생성자 함수이름 이므로 파스칼 표기법
module.exports = (env, options) => {
  return {
    resolve:{
      extensions:['.js'],//import 키워드로 가져올때.js 확장자 생략할게 
      alias:{
        '~': path.resolve(__dirname,'src') //webpackconfig(=__dirname) 주변의 src를 heropy로 쓸게
      }
    },
    entry:'./src/main.js', //여러개로 하고싶으면 { main: './main.js', sub: './sub.js' } 
    output: {
      //path: '',
      //filename:''
      publicPath:'/',
      clean: true
    },
    module:{
      rules:[
        {
          test:/\.js$/,//자바스크립트 파일이필터링이 되면
          exclude: /node_modules/,//node_modules는 제외할게
          use:'babel-loader'//바벨 로더를 사용할게
        },
        {
          test:/\.s?css$/,
          use:[
            'style-loader',
            'css-loader',//자바스크립트에서 css import할 때 알아 먹어라
            'postcss-loader',//vender prefix 자동으로 부여해주는 (-webkit- 같은거)
            'sass-loader' 
          ]
        }
      ]
    },
    plugins:[
      new HtmlPlugin({
        template:'./src/index.html'
      }),
      new CopyPlugin({
        patterns: [
          { from: 'static' }
        ]
      }) 
    ],
    devServer:{
      port:8080,
      open:true, //브라우저가 자동으로 열림
      historyApiFallback:true //window 객체에는 history 가 있는데 뒤로가기 앞으로가기 이런거 하는기능
    }                       //라우터의 히스토리 모드에서 필요하므로 씀 
  }
}