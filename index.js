 const fs = require('fs');
const http = require('http')
const url = require('url');

const replaceTemplate = (temp,product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
    output = output.replace(/{%IMAGE%}/g,product.image)
    output = output.replace(/{%PRICE%}/g,product.price)
    output = output.replace(/{%FROM%}/g,product.from)
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients)
    output = output.replace(/{%QUANTITY%}/g,product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g,product.description)
    output = output.replace(/{%ID%}/g,product.id)

    if(!product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic')
        
    }
    return output
    
}
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObj =  JSON.parse(data)

http.createServer((req,res) =>{
    const pathName = req.url;
    if(pathName === '/' ||  pathName === '/overview'){
        res.writeHead(200,{
            'Content-type':'text/html'            
        });
        const cardsHtml = dataObj.map(el=>{
            return replaceTemplate(tempCard,el)
        }).join('');
       
        const output = tempOverview.replace('{%PRODUCT_CART%}',cardsHtml)
        res.end(output)
    }
        
    else if (pathName === '/product'){
        res.end('This is the Product')
    }
        
    else if(pathName === '/api'){
        res.writeHead(200,{'Content-type':'application/json'})
        res.end(data)
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