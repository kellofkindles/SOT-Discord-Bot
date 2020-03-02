var colors = require('colors'); // Console colors library
const express = require('express'); // Website library
const app = express(); // Start express
const port = process.env.PORT || 3000; // Start express on specifc port
function website2(){

app.use(express.static('public')) // Set public directory as website

app.listen(port, () => console.log(`Website hosted on port ${port}!`.brightBlue))

}
module.exports = website; // Export website()
