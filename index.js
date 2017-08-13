var aliyun = require('aliyun-sdk');
var recursive = require('recursive-readdir');
var config = require('./config.js');

var cdn = new aliyun.CDN({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  endpoint: 'https://cdn.aliyuncs.com',
  apiVersion: '2014-11-11'
});

function pushToCDN(url){
  cdn.pushObjectCache({
    ObjectPath: url
  },function(err,res){});
}

config.dirs.forEach(function(dir){
  recursive(dir.serverPath,function(err,files){
    files.forEach(function(file){
      //push file to CDN
      var url = file.replace(dir.serverPath, dir.hostName);
      pushToCDN(url);
      //if url contains index.html, push url without index.html again
      if(url.indexOf('index.html')!==-1){
        url = url.replace('index.html','');
        pushToCDN(url);
      }
    });
  });
});
