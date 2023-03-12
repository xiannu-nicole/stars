// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/stars/'
//     : './'
// }
module.exports = {
  publicPath: './',
    outputDir: 'dist',
    lintOnSave: true,
    runtimeCompiler: true,
    chainWebpack: () => {},
    configureWebpack: () => {},
    devServer: {
      open: process.platform === 'darwin',
      host: '0.0.0.0',
      port: 8080,
      https: false,
      hotOnly: false,
      proxy: null, 
      before: app => {}
    }
  }
