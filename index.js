const http = require('http');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`hello world`);
  console.log('---------------------');
  console.log('req.query', req.query);
  console.log('---------------------');
  console.log('req.url', req.url);
  console.log('---------------------');
  console.log('req.method', req.method);
});

server.listen(PORT);
