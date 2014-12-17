/* global describe, it */

var cmp = require( 'comparejs' );
var path = require( 'path' );
var assert = require( 'chai' ).assert;

var util = require( '..' );

/******************************************************************************
 *****     expandSourceFiles    ***********************************************
 ******************************************************************************/

function callnCompare( expected, fnArg ) {
	var ret = util.expandSourceFiles( fnArg );
	var itsAllGood = cmp.eq( ret, expected );
	assert( itsAllGood, true );
}

describe( 'expandSourceFiles', function() {

	var expected = {
		test: [ {
			fqp: path.join( process.cwd(), 'test/files/testfile1.txt' ),
			path: path.join( process.cwd(), 'test/files/testfile1.txt' ),
			contents: 'Hello World\n'
		} ]
	};

	var pathArg = path.join( process.cwd(), 'test/files/**/*.txt' );

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
		pathArg = 'test/files/**/*.txt';
		expected.test[ 0 ].path = 'test/files/testfile1.txt';

		callnCompare( expected, {
			test: {
				cwd: process.cwd(),
				src: pathArg
			}
		} );
	} );

	it( 'works with src as a array', function() {
		pathArg = 'test/files/**/*.txt';
		expected.test[ 0 ].path = 'test/files/testfile1.txt';

		callnCompare( expected, {
			test: {
				cwd: process.cwd(),
				src: [ pathArg ]
			}
		} );
	} );

} );
