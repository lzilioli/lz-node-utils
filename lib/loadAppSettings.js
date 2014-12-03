/**
 * Function that returns a configuration given a path to a file in which defaults
 * are specified, and a path to a file in which user overrides are specified.
 * Resulting object is defaultSettings object with userSettings object overriding.
 *
 * Arguments default to `config/default-settings.js` and `config/settings.js`,
 * respectively.
 *
 * @param  {String}	defaultSettingsPath 	the path to your app's default settings
 * @param  {String}	userSettingsPath 		the path to your app's user overrides
 * 											or evironment settings
 * @return {Object}							The app's settings with user's overriding default
 */
module.exports = function( defaultSettingsPath, defaultUserSettingsPath ) {
	var _ = require( 'underscore' );
	var fs = require( 'fs' );
	var pth = require( './pth' );
	var req = require( './getReqFn' )( 'lib' );

	var defaultSettingsFile = 'config/default-settings.js' || defaultSettingsPath;
	var userSettingsFile = 'config/settings.js' || defaultUserSettingsPath;

	// Load app configuration
	var appSettings = require( pth( defaultSettingsFile ) );
	if ( fs.existsSync( pth( userSettingsFile ) ) ) {
		var userSettings = req( userSettingsFile, true );
		appSettings = _.extend( {}, appSettings, userSettings );
	}

	return appSettings;
};
