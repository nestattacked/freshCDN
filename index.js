var aliyun = require('aliyun-sdk');
var recursive = require('recursive-readdir');

var config = {
    accessKeyId: '',
    secretAccessKey: '',
    serverPath: '',
    hostName: ''
};

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

recursive(config.serverPath,function(err,files){
    files.forEach(function(file){
        var url = file.replace(config.serverPath, config.hostName);
        pushToCDN(url);
    });
});
