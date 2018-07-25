const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser());

app.use(async (ctx, next) => {
    ctx.statusCode = 200;

    console.log();
    console.log(`#################### ${new Date()}`);

    const response = {
        method: ctx.method,
        body: ctx.request.body,
        url: ctx.url,
        headers: ctx.headers
    };

    ctx.body = response;

    console.log(response);

    await next();
});

app.listen(3000);