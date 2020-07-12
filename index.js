var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    let title = queryData.id
    let pathname = url.parse(_url, true).pathname;
    if (pathname == "/") {
        if (title == undefined) {
            fs.readdir('./data', (err, files) => {
                let title = 'Welcome';
                let description = 'Hello, Node js';
                let list = '<ul>'
                for (i = 0; i < files.length; i++) {
                    list = list + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`
                }
                list = list + '</ul>'

                let template = `
                <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            
                `
                response.writeHead(200);
                response.end(template);
            })


        } else {
            fs.readdir('./data', (err, files) => {
                let description = 'Hello, Node js';
                let list = '<ul>'
                for (i = 0; i < files.length; i++) {
                    list = list + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`
                }
                list = list + '</ul>'
                fs.readFile(`data/${title}`, 'utf8', (err, description) => {
                    let template = `
            <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        
            `
                    response.writeHead(200);
                    response.end(template);
                })
            })
        }
    } else {
        response.writeHead(404);
        response.end("Not Found")
    }


});
app.listen(3000);