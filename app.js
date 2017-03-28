/**
 * Sleek app init
 * Here we iniialize :: Its better to dont edit, if you're a beginner :)
 *  
 * @package Sleek.js
 * @version 1.0
 * 
 * The MIT License (MIT)

 * Copyright Cubet Techno Labs, Cochin (c) <2013> <info@cubettech.com>

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * @author Robin <robin@cubettech.com>
 * @Date 23-10-2013
 */

//require our needs
var express = require('express');
var http = require('http');
var path = require('path');
var exphbs  = require('express-handlebars');
var helmet  = require('helmet');
var fs = require('fs');
var hbs = require('handlebars');
var engines = require('consolidate');
global.app = express();
global.sleekConfig = {};


require(path.join(__dirname,'application/config/config.js'));


var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
//json        = require('json'),
//urlencoded   = require('urlencode'),
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var cookieParser = require('cookie-parser');
var static = require('serve-static')
var errorHandler = require('errorhandler');

var app = express();

app.set('env', sleekConfig.env || process.env.NODE_ENV);

// all environments
app.set('port', process.env.PORT || sleekConfig.appPort);
app.set('host', sleekConfig.appHost ? sleekConfig.appHost : 'localhost');
app.set('views', path.join(__dirname, 'application/views'));
app.set('view engine', 'handlebars');
app.engine('html',  exphbs({
        defaultLayout: 'default',
        layoutsDir: path.join(__dirname, 'application/layouts/'),
        extname:".html"
    })
); 
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(static(path.join(__dirname, 'public')));
app.use(static(path.join(__dirname, 'uploads')));
app.use(methodOverride());
app.use(cookieParser('CubEtNoDeSlEek'))
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'CubEtNoDeSlEek' }));

app.use(helmet());

app.set('strict routing');



//set Site url
global.sleekConfig.siteUrl = app.get('host')+':'+app.get('port');
//get configs
var sFolderPath = path.join(__dirname, 'install');
var cur_directory = path.join(__dirname, '');
fs.exists(sFolderPath, function(exists) {
    if (!exists){
        require('./system/core/sleek.js')(app);
    }
    else
    {
        require('./system/install/route.js')(app,sFolderPath,cur_directory);
    }
});
// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
} else {
    //prevent crash
    process.on('uncaughtException', function (exception) {
        console.log(exception);
    });
}


try {
    var server = http.createServer(app);
    global.sio = require('socket.io')(server);
    server.listen(app.get('port'), function(){
        console.log('application running at ' + sleekConfig.siteUrl);
    });
} catch (e) {
    console.error(e);
}
