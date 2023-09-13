const http = require('http');

http.createServer(function(req, res) {
res.write('On the way to being a full snackengineer!')
res.end()
}
).listen(3000);

console.log('server started on Port 3000');
