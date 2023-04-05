const http = require('http');

const requestListener = (request, response) => {
    const { method } = request;

    if(method === 'GET') {
        // response ketika GET
        response.end('<h1>method get!</h1>');
    }
 
    if(method === 'POST') {
        // response ketika POST
        response.end('<h1>method post!</h1>');
    }
    if(method === 'PUT') {
        // response ketika GET
        response.end('<h1>method put!</h1>');
    }
 
    if(method === 'DELETE') {
        // response ketika POST
        response.end('<h1>method delete!</h1>');
    }
};
 
const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});