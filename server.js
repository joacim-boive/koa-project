const Koa = require('koa');
const convert = require('koa-connect');

const app = new Koa();

app.use((convert(proxy('/rest/', {
    target: 'https://secure5.ft.ecster.se',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    pathRewrite:{
        '^/rest/': '/rest/sessions/v1/'
    },
    onClose: (res, socket, head) =>{
        console.info('Proxy closed!');
    },
    onError: (err, req, res) => {
        console.error(err.message);
    },
    onProxyRes: (proxyRes, req, res) => {
        debugger;
        proxyRes.headers['x-onProxyRes'] = 'response';
    },
    onProxyReq: (proxyReq, req, res) => {
        debugger;
        proxyReq.setHeader('X-ECSTER-Origin', 'mypages');
        proxyReq.setHeader('Content-Type', 'application/json');
    },

}))));

app.listen(3000);