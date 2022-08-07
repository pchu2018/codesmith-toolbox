const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer( (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(fs.readFileSync(path.resolve('index.html')))
  }
  else if (req.method === 'GET' && req.url === '/dist/bundle.js') {
    res.writeHead(200, {'Content-type': 'application/javascript'});
    res.end(fs.readFileSync(path.resolve('dist/bundle.js')))
  }
  else {
    res.writeHead(400);
    res.end('index not found')
  }
}).listen(8080)

module.exports = server;