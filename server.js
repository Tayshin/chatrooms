var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
//404响应方法 返回404信息
function send404(res){
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.write('Error 404: resource not found.');
    res.end();
}
//提供文件数据 发送文件
function sendFile(res,filePath,fileContents){
    res.writeHead(
        200,
        {
            'Content-Type': mime.lookup(path.basename(filePath))
        }
    );
    res.end(fileContents);
}
//提供静态文件服务 先检查内存是否有缓存
function serveStatic(res,cache,absPath){
    //如果缓存存在
    if(cache[absPath]){  
        sendFile(res,absPath,cache[absPath]); //直接发送缓存中的文件
    }
    else{
        //检查文件系统里有没有
        fs.exists(absPath, function(exists) {
            //若存在
            if(exists){
                fs.readFile(absPath, function(err, data){
                    if(err){
                        send404(res);
                    }
                    else{
                        //放入缓存
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            }
            else{

            }
        })
    }
}