/* global describe, it, beforeEach, afterEach */

var path = require( 'path' );
var assert = require( 'chai' ).assert;
var shell = require( 'shelljs' );

var util = require( '..' );

/******************************************************************************
 *****     expandSourceFiles    ***********************************************
 ******************************************************************************/

function invokeTest( a, b, expected ) {
	var ret = util.loadAppSettings( a, b );
	assert.deepEqual( ret, {
		test: expected
	} );
}

function checkThrow( a, b ) {
	assert.throws( util.loadAppSettings.bind( util.loadAppSettings, a, b ) );
}

module.exports = function() {


	describe( 'loadAppSettings', function() {

		var root = {
			src: path.join( __dirname, 'config' ),
			default: {
				path: path.join( process.cwd(), 'config/default-settings.js' ),
				expected: 'root-default'
			},
			user: {
				path: path.join( process.cwd(), 'config/settings.js' ),
				expected: 'root-override'
			}
		};
		var custom = {
			src: path.join( __dirname, 'tmp.ignore/config-custom' ),
			default: {
				path: path.join( __dirname, 'tmp.ignore/config-custom/default-settings.js' ),
				expected: 'custom-default'
			},
			user: {
				path: path.join( __dirname, 'tmp.ignore/config-custom/settings.js' ),
				expected: 'custom-override'
			}
		};

		beforeEach( function() {
			shell.cp( '-r', path.join( __dirname, 'config' ), process.cwd() );
			shell.cp( '-r', path.join( __dirname, 'config-custom' ), path.join( __dirname, 'tmp.ignore' ) );
		} );

		afterEach( function() {
			shell.rm( '-rf', path.join( process.cwd(), 'config' ) );
			shell.rm( '-rf', path.join( __dirname, 'tmp.ignore' ) );
		} );

		// 10 is the correct number of cases, to prove it, draw a tree
		// as follows:
		// undefined vs. defined
		// default file exists (each undefined node is a dead-end down the tree ("throws" test cases))
		// user parameter undefined vs. defined
		// these leaf nodes are the 8 dditional cases to cover
		// hence 10 test cases covers all possibilities of this function's usage

		describe( 'first param undefined', function() {
			it( 'throws if default missing', function() {
				shell.rm( root.default.path );
				checkThrow( undefined, undefined );
			} );

			it( 'no user, no file', function() {
				shell.rm( root.user.path );
				invokeTest( undefined, undefined, root.default.expected );
			} );

			it( 'no user, file', function() {
				invokeTest( undefined, undefined, root.user.expected );
			} );

			it( 'user, no file', function() {
				shell.rm( custom.user.path );
				invokeTest( undefined, custom.user.path, root.default.expected );
			} );

			it( 'user, file', function() {
				invokeTest( undefined, custom.user.path, custom.user.expected );
			} );
		} );

		describe( 'second param undefined', function() {
			it( 'Throws if default missing', function() {
				shell.rm( custom.default.path );
				checkThrow( custom.default.path, undefined );
			} );

			it( 'no user, no file', function() {
				shell.rm( root.user.path );
				invokeTest( custom.default.path, undefined, custom.default.expected );
			} );

			it( 'no user, file', function() {
				invokeTest( custom.default.path, undefined, root.user.expected );
			} );

			it( 'user, no file', function() {
				shell.rm( custom.user.path );
				invokeTest( custom.default.path, custom.user.path, custom.default.expected );
			} );

			it( 'user, file', function() {
				invokeTest( custom.default.path, custom.user.path, custom.user.expected );
			} );
		} );

	} );
};
