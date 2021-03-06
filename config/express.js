const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const consign = require('consign')
const cors = require('cors')

module.exports = () =>{
    const app = express()
    app.set('port', process.env.PORT || config.get('server.port'))

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", '*');
        app.use(cors());
        next();
    });
    app.use(bodyParser.json());

    consign({cwd: 'api'})
        .then('controllers')
        .then('routes')
        .into(app)

    return app
}
