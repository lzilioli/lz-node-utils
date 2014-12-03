var path = require( 'path' );

/**
 * Like path.join, but returns an absolute path to the referenced location.
 *
 * @param  {[String]}	the desired path from the repos root
 * @return {String}		the path within the repo from /
 */
module.exports = function() {
	// push the path to the root directory as the first argument
	Array.prototype.unshift.apply( arguments, [ process.cwd() ] );
	// return the result of path.join on the new arguments array
	return path.join.apply( this, arguments );
};
