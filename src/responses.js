// Requires
const fs = require('fs');

// Files
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Respond
const respond = (request, response, content, type) => {
  response.writeHead(200, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  console.log(content);
  response.write(content);
  response.end();
};

// Get index page
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

// Get CSS Loaded
const getCSS = (request, response) => {
  respond(request, response, css, 'text/css');
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
    return respond(request, response, responseXML, 'text/xml');
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json');
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
    return respond(request, response, responseXML, 'text/xml');
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json');
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
    return respond(request, response, responseXML, 'text/xml');
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json');
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
    return respond(request, response, responseXML, 'text/xml');
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json');
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
    return respond(request, response, responseXML, 'text/xml');
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json');
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
    return respond(request, response, responseXML, 'text/xml');
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json');
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
    return respond(request, response, responseXML, 'text/xml');
  }
  const string = JSON.stringify(message);
  return respond(request, response, string, 'application/json');
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
