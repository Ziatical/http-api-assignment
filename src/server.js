// Requires
const http = require('http');
const responses = require('./responses.js');

// Port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// URL Structure
const urlStruct = {
  '/': responses.getIndex,
  '/style.css': responses.getCSS,
  '/success': responses.success,
  '/badRequest': responses.badRequest,
  '/unauthorized': responses.unauthorized,
  '/forbidden': responses.forbidden,
  '/internal': responses.internal,
  '/notImplemented': responses.notImplemented,
  '/notFound': responses.notFound,
  index: responses.getIndex,
  notFound: responses.notFound,
};

// Handle Requests
const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  request.acceptedType = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    urlStruct.index(request, response);
  }
};

// Start Server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
