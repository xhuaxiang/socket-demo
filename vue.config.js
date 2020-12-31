const path = require('path')
const defaultSettings = require('./src/settings.js')
const CompressionPlugin = require("compression-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const cdn = {
  css: [
    'https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css'
  ],
  js: [
    'https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    'https://cdn.bootcdn.net/ajax/libs/echarts/4.7.0/echarts.common.min.js',
    'https://cdn.bootcdn.net/ajax/libs/echarts/4.7.0/echarts.min.js',
    'https://cdn.bootcdn.net/ajax/libs/moment.js/1.0.0/moment.min.js',
    'https://unpkg.com/element-ui@2.13.0/lib/index.js'
  ]
}


module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    port: 1200
  },
  configureWebpack: config=>{
    if(process.env.NODE_ENV === 'production'){
			config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'echarts': 'eCharts',
        'element-ui': 'ELEMENT',
        'moment': 'moment',
      }
			config.plugins.push(new CompressionPlugin({
				test:/\.js$|\.html$|.\css/, //匹配文件名
				threshold: 10240,//对超过10k的数据压缩
				deleteOriginalAssets: false //不删除源文件
			}))
			config.plugins.push(new UglifyJsPlugin({
				uglifyOptions: {
					compress: {
						drop_debugger: true,
						drop_console: true,  //生产环境自动删除console
					},
					warnings: false,
				},
				sourceMap: false,
				parallel: true,//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
			}))
			config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
	chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html')
      .tap(args => {
          args[0].cdn = cdn;
        return args;
      })
    }
  }
}