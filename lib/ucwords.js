/**
 * Same as php ucwords
 *
 * @param  {String}	str		text to ucwords-ify
 * @return {String}			str, but ucwords-ified
 */
module.exports = function( str ) {
	return str.replace( /\w\S*/g, function( txt ) {
		return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 ).toLowerCase();
	} );
};
