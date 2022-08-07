import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer( (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(fs.readFileSync(path.resolve(__dirname, 'index.html')))
  }
}).listen(8080)

module.exports = server;