module.exports = ( function() {
	return {
		file: require( './file' ),
		getReqFn: require( './getReqFn' ),
		pth: require( './pth' ),
		loadAppSettings: require( './loadAppSettings' ),
		stripYamlFront: require( './stripYamlFront' ),
		ucwords: require( './ucwords' ),
		_deepExtend: require( './deepExtend' ),
		expandSourceFiles: require( './expandSourceFiles' )
	};
}() );
