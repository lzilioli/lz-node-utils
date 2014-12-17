var path = require( 'path' );
var _ = require( 'underscore' );
var file = require( './file' );


// opts.sourceFiles can either be
// key: [ fileGlob ]
// or
// key: {
// 		cwd: ''
//		src: [ fileGlob ]
// }
// If the latter, the cwd part fo the file's paths won't be exposed to the
// translators or models

module.exports = function( sourceFiles ) {
	var retVal = {};

	_.each( _.keys( sourceFiles ), function( key ) {

		var sourceFileOpts = sourceFiles[ key ];

		// if a cwd is specified, capture it now
		var cwd = ( sourceFileOpts.cwd ? sourceFileOpts.cwd : '' );
		if ( cwd.length && cwd[ cwd.length - 1 ] !== '/' ) {
			cwd = cwd + '/';
		}

		if ( !cwd && !_.isArray( sourceFileOpts ) ) {
			sourceFileOpts = [ sourceFileOpts ];
		}

		// Get a list of the files that match the sourceFileOpts
		var fileList = [];
		if ( _.isArray( sourceFileOpts ) ) {
			fileList = file.expand( sourceFileOpts );
		} else {
			if ( !_.isArray( sourceFileOpts.src ) ) {
				sourceFileOpts.src = [ sourceFileOpts.src ];
			}
			_.each( sourceFileOpts.src, function( src ) {
				var globPattern = path.join( cwd, src );
				fileList.push( file.expand( globPattern ) );
			} );
		}

		fileList = _.flatten( fileList );

		retVal[ key ] = _.map( fileList, function( fqp ) {
			var fileContents = file.read( fqp );
			var filePath = fqp.replace( cwd, '' );
			return {
				fqp: fqp,
				path: filePath,
				contents: fileContents
			};
		} );

	} );

	return retVal;
};
