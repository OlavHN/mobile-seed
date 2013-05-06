var fs = require('fs');
var connect = require('connect');

connect.static.mime.define({'application/x-web-app-manifest+json': ['webapp']});
connect.static.mime.define({'text/cache-manifest': ['appcache']});

var app = connect()
  .use(connect.static('www'))
  .use(function(req, res){
    fs.createReadStream('www/index.html').pipe(res);
  })
  .listen(8080);