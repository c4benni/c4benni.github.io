const https = require('https');

const readStream = require('readline')

https.get('https://coderbyte.com/api/challenges/json/json-cleaning', async (resp) => {
  
  let data = '';

  // parse json data here...
 resp.on('data', (e) => {
   data = JSON.parse(e.toString())

   for (let key in data) {
     const value = data[key]
     
     if (/^$|-|N\/A/.test(value)) {
       delete data[key]
     }

     
   }

console.log(data);

  })
  
  
});