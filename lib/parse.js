const path = require ( 'path' );
const fs = require ( 'fs' );
const generate = require ( './generate' )

let harData = '';
const parse = ( url , options ) => {
        let extname = path.extname ( url );
        if ( extname !== '.har' && extname !== '.json' ) {
                throw new Error ( '文件格式不支持' )
        }
        fs.readFile ( url , 'utf8' , ( err , data ) => {
                if ( err ) throw err;
                harData = JSON.parse ( data );
                generate ( harData , options )
        } )
}
module.exports = parse;