const path = require('path')
const glob = require('glob')
const fileManagerPlugin = require('filemanager-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackInlinePlugin = require('html-webpack-inline-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const buildDate = JSON.stringify(new Date().toLocaleString())

const isProd = process.env.NODE_ENV === 'production'

// const pageMethod = require('./util/getPages.js')
// const pages = pageMethod.pages()

// const name = defaultSettings.title

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  // assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // pages,
  devServer: {
    port: 8000,
    noInfo: true,
    progress: true,
    open: true

  },
  configureWebpack: (config) => {
    const pluginsPro = [
      new HtmlWebpackInlinePlugin({
        compress: false
      }),
      new fileManagerPlugin({
        onEnd: {
          delete: [
            './dist.zip'
          ],
          archive: [
            {
              source: './dist', destination: './dist.zip'
            }
          ]
        }
      })
    ]
    const pluginsDev = []

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      config.plugins = [...config.plugins, ...pluginsPro, ...pluginsDev]
      config.plugins.push(new CompressionPlugin({
        test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
        threshold: 1024, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
        minRatio: 0.8,
        deleteOriginalAssets: false // 是否删除原文件
      }))
    } else {
      // 为开发环境修改配置...
      // config.mode = 'development'
      config.plugins = [...config.plugins, ...pluginsDev]
    }
    Object.assign(config, {
      // 开发生产共同配置
      // name:name,
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@p': path.resolve(__dirname, './src/pages'),
          '@v': path.resolve(__dirname, './src/views')
        } // 别名配置
      }
    })
  },
  chainWebpack (config) {
    // config.plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    config.plugins.delete('prefetch')

    config.resolve.alias
      .set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 这个是加上自己的路径,不能使用(如下:alias)中配置的别名路径
        path.resolve(__dirname, './src/css/variables.less')
      ]
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  transpileDependencies: [
    // 可以是字符串或正则表达式
    'ant-design-vue'
  ]
}
