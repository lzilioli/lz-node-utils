/**
 * Return a function that, when called, will require a module relative to rootDir.
 *
 * @param  {String}		rootDir		the base directory that the returned function
 *									will use to require in your module
 * @return {Function}				(see below)
 */
module.exports = function( rootDir ) {

	var pth = require( './pth' );

	/**
	 * Requires a file from the relative root passed to the function's generator.
	 *
	 * @param  {String}	pathToModule	relative path to module from rootDir passed to generator
	 * @param  {Bool}	fromRoot		(optional) if passed, the rootDir will be
	 *									ignored. This is a convenient way to load
	 *									a module relative to your project's root.
	 * @return {Object}					result of calling require([rootDir/]pathToModule)
	 */
	return function( pathToModule, fromRoot ) {
		var requirePath = pth( ( !!fromRoot ? '' : rootDir ), pathToModule );
		return require( requirePath );
	};

};
