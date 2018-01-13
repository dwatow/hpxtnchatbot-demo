const http = require('http');
const url = require('url');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const currUrl = url.parse(req.url, true);
  // res.end(`hello world`);
  console.log('---------------------');
  console.log('req.method', req.method);
  console.log('parameters', currUrl.query);
  console.log('token', currUrl.query["hub.challenge"]);
  res.end(currUrl.query["hub.challenge"]);
  // console.log('---------------------');
  // console.log('req.url["name"]', req.url["name"]);
});



function root (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // res.end(`hello world`);
  console.log('---------------------');
  console.log('req.method', req.method);
  console.log('parameters', url.parse(req.url, true).query);
  // console.log('---------------------');
  // console.log('req.url["name"]', req.url["name"]);
}

server.listen(PORT);
