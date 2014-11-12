var path = require( 'path' );
var fs = require( 'fs' );
var _ = require( 'underscore' );
var glob = require( 'glob' );

module.exports = ( function() {

	// Helpers
	var kindsOf = {};
	'Number String Boolean Function RegExp Array Date Error'.split( ' ' ).forEach( function( k ) {
		kindsOf[ '[object ' + k + ']' ] = k.toLowerCase();
	} );

	function kindOf( value ) {
		// Null or undefined.
		if ( value == null ) {
			return String( value );
		}
		// Everything else.
		return kindsOf[ kindsOf.toString.call( value ) ] || 'object';
	}

	// Process specified wildcard glob patterns or filenames against a
	// callback, excluding and uniquing files in the result set.
	function processPatterns( patterns, fn ) {
		// Filepaths to return.
		var result = [];
		// Iterate over flattened patterns array.
		_.flatten( patterns ).forEach( function( pattern ) {
			// If the first character is ! it should be omitted
			var exclusion = pattern.indexOf( '!' ) === 0;
			// If the pattern is an exclusion, remove the !
			if ( exclusion ) {
				pattern = pattern.slice( 1 );
			}
			// Find all matching files for this pattern.
			var matches = fn( pattern );
			if ( exclusion ) {
				// If an exclusion, remove matching files.
				result = _.difference( result, matches );
			} else {
				// Otherwise add matching files.
				result = _.union( result, matches );
			}
		} );
		return result;
	}

	// End Helpers


	var file = {};

	// Return an array of all file paths that match the given wildcard patterns.
	file.expand = function() {
		var args = _.toArray( arguments );
		// If the first argument is an options object, save those options to pass
		// into the glob.sync method.
		var options = kindOf( args[ 0 ] ) === 'object' ? args.shift() : {};
		// Use the first argument if it's an Array, otherwise convert the arguments
		// object to an array and use that.
		var patterns = Array.isArray( args[ 0 ] ) ? args[ 0 ] : args;
		// Return empty set if there are no patterns or filepaths.
		if ( patterns.length === 0 ) {
			return [];
		}
		// Return all matching filepaths.
		var matches = processPatterns( patterns, function( pattern ) {
			// Find all matching files for this pattern.
			return glob.sync( pattern, options );
		} );
		// Filter result set?
		if ( options.filter ) {
			matches = matches.filter( function( filepath ) {
				filepath = path.join( options.cwd || '', filepath );
				try {
					if ( typeof options.filter === 'function' ) {
						return options.filter( filepath );
					} else {
						// If the file is of the right type and exists, this should work.
						return fs.statSync( filepath )[ options.filter ]();
					}
				} catch ( e ) {
					// Otherwise, it's probably not the right type.
					return false;
				}
			} );
		}
		return matches;
	};

	var pathSeparatorRe = /[\/\\]/g;

	// The "ext" option refers to either everything after the first dot (default)
	// or everything after the last dot.
	var extDotRe = {
		first: /(\.[^\/]*)?$/,
		last: /(\.[^\/\.]*)?$/,
	};

	// TODO: document this function
	// Build a multi task "files" object dynamically.
	file.expandMapping = function( patterns, destBase, options ) {
		options = _.defaults( {}, options, {
			extDot: 'first',
			rename: function( destBase, destPath ) {
				return path.join( destBase || '', destPath );
			}
		} );
		var files = [];
		var fileByDest = {};
		var fileBySrc = {};
		// Find all files matching pattern, using passed-in options.
		file.expand( options, patterns ).forEach( function( src ) {
			var destPath = src;
			// Flatten?
			if ( options.flatten ) {
				destPath = path.basename( destPath );
			}
			// Change the extension?
			if ( 'ext' in options ) {
				destPath = destPath.replace( extDotRe[ options.extDot ], options.ext );
			}
			if ( options.trim ) {
				if ( destPath.indexOf( options.trim ) === 0 ) {
					destPath = destPath.substring( options.trim.length );
				}
			}
			// Generate destination filename.
			var dest = options.rename( destBase, destPath, options );
			// Prepend cwd to src path if necessary.
			if ( options.cwd ) {
				src = path.join( options.cwd, src );
			}
			// Normalize filepaths to be unix-style.
			dest = dest.replace( pathSeparatorRe, '/' );
			src = src.replace( pathSeparatorRe, '/' );
			// Map correct src path to dest path.
			if ( fileByDest[ dest ] ) {
				// If dest already exists, push this src onto that dest's src array.
				fileByDest[ dest ].src.push( src );
			} else {
				// Otherwise create a new src-dest file mapping object.
				files.push( {
					src: [ src ],
					dest: dest,
				} );
				// And store a reference for later use.
				fileByDest[ dest ] = files[ files.length - 1 ];
				fileBySrc[ src ] = files[ files.length - 1 ].dest;
			}
		} );
		return fileBySrc;
	};

	file.read = function( toRead ) {
		if ( !toRead ) {
			return '';
		}

		if ( !fs.existsSync( toRead ) ) {
			console.log( 'file does not exist:', toRead );
			return '';
		} else {
			var contents = fs.readFileSync( toRead ).toString();
			return contents;
		}
	};

	return {
		file: file
	};
}() );
