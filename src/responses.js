// Requires
const fs = require('fs');

// Files
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Respond
const respond = (request, response, content, type, statusCode = 404) => {
  response.writeHead(statusCode, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  console.log(content);
  response.write(content);
  response.end();
};

// Get index page
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html', 200);
};

// Get CSS Loaded
const getCSS = (request, response) => {
  respond(request, response, css, 'text/css', 200);
};

// SUCCESS 200
const success = (request, response) => {
  const message = {
    message: 'This is a successful response',
    id: 'success',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message>`;
    responseXML = `${responseXML} <id>${message.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, responseXML, 'text/xml', 200);
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json', 200);
};

// BAD REQUEST 400
const badRequest = (request, response) => {
  const message = {
    message: 'Missing valid query parameter set to true',
    id: 'badRequest',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message>`;
    responseXML = `${responseXML} <id>${message.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, responseXML, 'text/xml', 400);
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json', 400);
};

// UNAUTHORIZED 401
const unauthorized = (request, response) => {
  const message = {
    message: 'Missing loggedIn query parameter set to yes',
    id: 'unauthorized',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message>`;
    responseXML = `${responseXML} <id>${message.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, responseXML, 'text/xml', 401);
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json', 401);
};

// FORBIDDEN 403
const forbidden = (request, response) => {
  const message = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message>`;
    responseXML = `${responseXML} <id>${message.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, responseXML, 'text/xml', 403);
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json', 403);
};

// INTERNAL 500
const internal = (request, response) => {
  const message = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message>`;
    responseXML = `${responseXML} <id>${message.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, responseXML, 'text/xml', 500);
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json', 500);
};

// NOT IMPLEMENTED 501
const notImplemented = (request, response) => {
  const message = {
    message: 'A get reqest for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message>`;
    responseXML = `${responseXML} <id>${message.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, responseXML, 'text/xml', 501);
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json', 501);
};

// NOT FOUND 404
const notFound = (request, response) => {
  const message = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message>`;
    responseXML = `${responseXML} <id>${message.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, responseXML, 'text/xml', 404);
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json', 404);
};

// Exports
module.exports = {
  getIndex,
  getCSS,
  success,
  badRequest,
  internal,
  forbidden,
  unauthorized,
  notImplemented,
  notFound,
};
