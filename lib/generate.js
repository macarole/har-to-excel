const xlsx = require ( 'node-xlsx' )
const fs = require ( 'fs' );
const path = require ( 'path' );
const generate = ( harData , options ) => {
        const data = [
                [
                        '资源名称' ,
                        '资源类型' ,
                        '请求方法' ,
                        '响应状态' ,
                        '状态文本' ,
                        '总耗时' ,
                        '堵塞耗时' ,
                        '等待耗时' ,
                        '发送耗时' ,
                        '接收耗时' ,
                        '请求开始时间' ,
                        '请求头大小' ,
                        '请求体大小' ,
                        '总响应内容大小' ,
                        '响应头大小' ,
                        '响应体大小' ,
                        '服务器IP'
                ]
        ];
        let { version , creator , pages , entries } = harData[ 'log' ];
        let rate = 1024;
        entries.forEach ( entry => {
                if ( entry[ 'response' ][ 'content' ] ) {
                        delete entry[ 'response' ][ 'content' ][ 'text' ];
                        data.push ( [
                                entry[ 'request' ][ 'url' ] ,
                                entry[ 'response' ][ 'content' ][ 'mimeType' ] ,
                                entry[ 'request' ][ 'method' ] ,
                                entry[ 'response' ][ 'status' ] ,
                                entry[ 'response' ][ 'statusText' ] ,
                                Math.round ( entry[ 'time' ] ) ,
                                Math.round ( entry[ 'timings' ][ 'blocked' ] ) ,
                                Math.round ( entry[ 'timings' ][ 'wait' ] ) ,
                                Math.round ( entry[ 'timings' ][ 'send' ] ) ,
                                Math.round ( entry[ 'timings' ][ 'receive' ] ) ,
                                entry[ 'startedDateTime' ] ,
                                Math.round ( entry[ 'request' ][ 'headersSize' ] / rate ) ,
                                Math.round ( entry[ 'request' ][ 'bodySize' ] / rate ) ,
                                Math.round ( entry[ 'response' ][ '_transferSize' ] / rate ) ,
                                Math.round ( entry[ 'response' ][ 'headersSize' ] / rate ) ,
                                Math.round ( entry[ 'response' ][ 'bodySize' ] / rate ) ,
                                entry[ 'serverIPAddress' ] ,
                        ] )
                }
        } )
        data.push ( [
                'onContentLoad:' + Math.round ( pages[ 0 ][ 'pageTimings' ][ 'onContentLoad' ] ) + ' onLoad:' + Math.round ( pages[ 0 ][ 'pageTimings' ][ 'onLoad' ] )
        ] )
        let buffer = xlsx.build ( [ { name : 'har from chrome' , data : data } ] )
        let dest = options && options.dest ? options.dest : path.resolve ( __dirname , '../data/result.xlsx' );
        fs.writeFile ( dest , buffer , err => {
                if ( err ) throw new Error('完整路径，如：c:/result.xlsx');
                console.log ( '文件保存成功,保存在：'+dest )
        } )
}
module.exports = generate;