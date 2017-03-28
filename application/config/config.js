/* 
 * Configuration
 * 
 * @version 1.0
 * @author Robin <robin@cubettech.com>
 * @Date 23-10-2013
 */
var path = require('path');
//port number
global.sleekConfig.appPort = 3000;

global.sleekConfig.appHost = 'localhost';

global.sleekConfig.siteUrl = 'http://localhost:3000';
global.sleekConfig.env = 'development';

global.sleekConfig.configLibs = ['mongodb','session'];
//themeing
global.sleekConfig.theme = 'default'
//logging
global.sleekConfig.logToFile = false; // if true, logs will write to file instead of console.
global.sleekConfig.accesslog = path.join('' ,'application/var/logs/access.log'); // logging each access
global.sleekConfig.errorlog = path.join('' ,'application/var/logs/error.log'); // application errors
global.sleekConfig.systemlog = path.join('' ,'application/var/logs/system.log'); // manual logging

global.webpagepath = path.join('' ,"public/webpages");
global.videopath = path.join('' ,"public/videos");
global.user_images = path.join('' ,"public/user_images");
global.loggedUser = new Array();//array to save socket id of logged user
global.pass_salt = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';//salt append with passwordower123
