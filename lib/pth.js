var path = require( 'path' );

/**
 * Like path.join, but returns an absolute path to the referenced location.
 *
 * @param  {[String]}	the desired path from the repos root
 * @return {String}		the path within the repo from /
 */
module.exports = function() {
	return path.resolve( process.cwd(), path.join.apply( path.join, arguments ) );
};
