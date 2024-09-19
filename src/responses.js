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

const objectToSend = (request, response) => {
  let message = {};
  switch (request.url) {
    // 200
    case '/success':
      message = {
        message: 'This is a successful response',
        id: 'success',
      };
      break;
      // 400
    case '/badRequest':
      message = {
        message: 'Missing valid query parameter set to true',
        id: 'badRequest',
      };
      break;
      // 401
    case '/unauthorized':
      message = {
        message: 'Missing loggedIn query parameter set to yes',
        id: 'unauthorized',
      };
      break;
      // 403
    case '/forbidden':
      message = {
        message: 'You do not have access to this content.',
        id: 'forbidden',
      };
      break;
      // 500
    case '/internal':
      message = {
        message: 'Internal Server Error. Something went wrong.',
        id: 'internalError',
      };
      break;
      // 501
    case '/notImplemented':
      message = {
        message: 'A get reqest for this page has not been implemented yet. Check again later for updated content.',
        id: 'notImplemented',
      };
      break;
    // 404
    default:
      message = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
      };
      break;
  }
  if (request.acceptedType[0] === 'text/xml') {
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
  objectToSend,
  getIndex,
  getCSS,
};
