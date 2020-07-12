const folder = './data'
const fs = require('fs')

fs.readdir(folder, (err, files) => {
    console.log(files)
})