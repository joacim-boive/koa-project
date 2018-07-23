const Koa = require('koa');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');

const app = new Koa();

app.use((convert(proxy({
    target: 'https://www.ecster.se',
    changeOrigin: true,
    secure: true,
    logLevel: 'debug',
    headers:{
        'my-header': 'this is my header'
    },
    onClose: (res, socket, head) =>{
      console.info('Proxy closed!');
    },
    onError: (err, req, res) => {
        console.error(err.message);
    },
    onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['x-onProxyRes'] = 'response';
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('x-onProxyReq', 'request');
    },

}))));

app.listen(3000);