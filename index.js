const fs = require('fs');
const http = require('http')
const url = require('url');

http.createServer((req,res) =>{
    const pathName = req.url;
    if(pathName === '/' ||  pathName === '/overview')
        res.end('This is the OverView')
    else if (pathName === '/product')
        res.end('This is the Product')
    else {
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'its mine'
        });
        res.end('<h1>Page Not Found</h1>')
    }
        
}).listen(313,'127.0.0.1',()=>{
    console.log('Listeting to port : 313');
})