module.exports = {
  devServer: {
    // 反向代理端口地址及端口为 http://localhost:8080
    proxy: 'http://localhost:8088',
    port: 8088
  }
}
