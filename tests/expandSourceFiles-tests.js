/* global describe, it */

var path = require( 'path' );
var assert = require( 'chai' ).assert;

var util = require( '..' );

/******************************************************************************
 *****     expandSourceFiles    ***********************************************
 ******************************************************************************/

function callnCompare( expected, fnArg ) {
	var ret = util.expandSourceFiles( fnArg );
	assert.deepEqual( ret, expected );
}

module.exports = function() {


	describe( 'expandSourceFiles', function() {

		var expected = {
			test: [ {
				fqp: path.join( __dirname, 'files/testfile1.txt' ),
				path: path.join( __dirname, 'files/testfile1.txt' ),
				contents: 'Hello World\n'
			} ]
		};

		var pathArg = path.join( __dirname, 'files/**/*.txt' );

		it( 'works with string arguments', function() {
			callnCompare( expected, {
				test: pathArg
			} );
		} );

		it( 'works with array arguments', function() {
			callnCompare( expected, {
				test: [ pathArg ]
			} );
		} );

		// these 2 should be nested
		it( 'works with src as a string', function() {
			pathArg = 'files/**/*.txt';
			expected.test[ 0 ].path = 'files/testfile1.txt';

			callnCompare( expected, {
				test: {
					cwd: __dirname,
					src: pathArg
				}
			} );
		} );

		it( 'works with src as a array', function() {
			pathArg = 'files/**/*.txt';
			expected.test[ 0 ].path = 'files/testfile1.txt';

			callnCompare( expected, {
				test: {
					cwd: __dirname,
					src: [ pathArg ]
				}
			} );
		} );

	} );
};
