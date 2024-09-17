// Respond JSON
const respondJSON = (request, response, status, object) => {
    const content = JSON.stringify(object);

    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content, 'utf-8'),
    };

    response.writeHead(status, headers);

    if(request.method !== 'HEAD') {
        response.write(content);
    }
    response.end();
};

// Not Found
const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };
    respondJSON(request, response, 404, responseJSON);
};

// Success
const success = (request, response) => {
    const responseJSON = {
        message: 'This is a successful response',
        id: 'success',
    };
    respondJSON(request, response, 200, responseJSON);
};

// Bad Request
const badRequest = (request, response) => {
    const responseJSON = {
        message: 'Missing valid query parameter set to true',
        id: 'badRequest',
    };
    respondJSON(request, response, 400, responseJSON);
};

// Unauthorized
const unauthorized = (request, response) => {
    const responseJSON = {
        message: 'Missing loggedIn query parameter set to yes',
        id: 'unauthorized',
    };
    respondJSON(request, response, 401, responseJSON);
};

// Forbidden
const forbidden = (request, response) => {
    const responseJSON = {
        message: 'You do not have access to this content.',
        id: 'forbidden',
    };
    respondJSON(request, response, 403, responseJSON);
};

// Internal
const internal = (request, response) => {
    const responseJSON = {
        message: 'Internal Server Error. Something went wrong.',
        id: 'internalError',
    };
    respondJSON(request, response, 500, responseJSON);
};

// Not Implemented
const notImplemented = (request, response) => {
    const responseJSON = {
        message: 'A get reqest for this page has not been implemented yet. Check again later for updated content.',
        id: 'notImplemented',
    };
    respondJSON(request, response, 501, responseJSON);
};

// Exports
module.exports = {
    notFound,
    success,
    badRequest, 
    unauthorized,
    forbidden,
    internal,
    notImplemented,
};