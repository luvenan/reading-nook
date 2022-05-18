//This code is to deploy a full stack app to heroku
const path = require('path');
module.exports = {
    //Changes the deployment folder to 'public' and puts it in the backend so it is deployed directly to heroku
    outputDir: path.resolve(__dirname, '../Backend/public'),
    devServer: {
        proxy: {
            //Creates a proxy so I don't have to specify the localhost in the fetch call
            '/api': {
                target: 'http://localhost:5000'
            }
        }
    }
}