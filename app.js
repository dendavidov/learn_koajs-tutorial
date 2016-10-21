const koa = require('koa');
const serve = require('koa-static');
const session = require('koa-session');
const router = require('./routes');
const bodyParser = require('koa-body');
const app = koa();

app.keys = ['Secret key'];
app.use(session(app));

app.use(function *(){
  var n = this.session.views || 0;
  this.session.views = ++n;
  if(n === 1)
    this.body = 'Welcome here for the first time!';
  else
    this.body = "You've visited this page " + n + " times!";
});

//Set up Pug
var Pug = require('koa-pug');
var pug = new Pug({
  viewPath: './views',
  baseDir: './views',
  app: app
});

app.use(serve('./public'));
app.use(serve('./images'));

app.use(bodyParser({
  formidable: {
    uploadDir:'./uploads'
  },
  multipart: true,
  urlencoded: true
}));

app.use(router.routes());

app.listen(3000);




