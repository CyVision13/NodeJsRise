const fs = require('fs');
const http = require('http')
const url = require('url');

http.createServer((req,res) =>{
    const pathName = req.url;
    if(pathName === '/' ||  pathName === '/overview')
        res.end('This is the OverView')
    else if (pathName === '/product')
        res.end('This is the Product')
    else if(pathName === '/api'){
        fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data)=>{
            const productData = JSON.parse(data)
            res.writeHead(200,{'Content-type':'application/json'})
            res.end(data)
        })
    }
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