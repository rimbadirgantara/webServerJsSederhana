const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method, url } = request;

    if (url === '/'){
        if (method === 'GET'){
            response.end('<h1>Ini adalah homepage !</h1>');
        } else {
            request.statusCode = 400;
            response.end('<h1>halaman tidak ditemukan !</h1>');
        }
    } else if (url === '/about'){
        if (method === 'GET'){
            response.end('<h1>Ini adalah about !</h1>');
        }  else if (method === 'POST') {
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
            request.statusCode = 400;
            response.end('<h1>Halaman tidak ditemukan !</h1>');
        }
    } else {
        request.statusCode = 400;
        response.end('<h1>Halaman tidak ditemukan !</h1>');
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