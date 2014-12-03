var yamlFront = require( 'yaml-front-matter' );

/**
 * Given a string, return it without the front matter.
 *
 * @param  {String}	contents	text from which to strip YAML front matter
 * @return {String}				contents minus YAML front matter
 */
module.exports = function( contents ) {
	return yamlFront.loadFront( contents ).__content;
};
