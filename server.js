const http = require('http');

const requestListener = (request, response) => {
    // respone header
    // response.setHeader('Content-Type', 'text/html');
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJs');

    const { method, url } = request;

    if (url === '/'){
        if (method === 'GET'){
            response.statusCode = 200;
            
            // respone body
            response.end(JSON.stringify({
                message: 'Ini adalah homepage !'
            }));
        } else {
            response.statusCode = 400;

            // respone body
            response.end(JSON.stringify({
                message: 'halaman tidak ditemukan !'
            }));
        }
    } else if (url === '/about'){

        if (method === 'GET'){
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Ini adalah about !',
            }));

        }  else if (method === 'POST') {

            // writable stream
            response.statusCode = 200;
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                response.end(`<h1>HI ${name} !</h1>`);
            });

        } else {
            response.statusCode = 400;

            // respone body
            response.end(JSON.stringify({
                message: 'Halaman tidak ditemukan !',
            }));
        }
    } else {
        response.statusCode = 400;

        // respone body
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan !',
        }));
    }

    /*
    Pertama, kita deklarasikan variabel body dan inisialisasikan nilainya dengan array kosong. Ini berfungsi untuk menampung buffer pada stream. 
    Lalu, ketika event data terjadi pada request, kita isi array body dengan chunk (potongan data) yang dibawa callback function pada event tersebut.
    Terakhir, ketika proses stream berakhir, maka event end akan terbangkitkan. Di sinilah kita mengubah variabel body yang sebelumnya menampung buffer menjadi data sebenarnya dalam bentuk string melalui perintah Buffer.concat(body).toString().
    */
};
 
const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});