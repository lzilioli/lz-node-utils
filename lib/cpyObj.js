var _ = require( 'underscore' );
require( './deepExtend' )( _ );

module.exports = function( obj, shallow ) {
	return shallow ? _.extend( {}, obj ) : _.deepExtend( {}, obj );
};
