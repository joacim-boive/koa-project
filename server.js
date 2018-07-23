const Koa = require('koa');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');

const app = new Koa();

app.use((convert(proxy({
    'target': 'http://www.example.org/',
    logLevel: 'debug'
}))));

app.listen(3000);