lz-node-utils
=============

Useful utility functions for node.

# Usage

```bash
npm install --save-dev git+http://git@github.com/lzilioli/lz-node-utils.git
```

```javascript
var util = require( 'lz-node-utils' );
```

## Methods

### `util.file`

The following were taken from [`grunt.file`](https://github.com/gruntjs/grunt/blob/master/lib/grunt/file.js), with the grunt dependency removed.

- `file.expand`
- `file.expandMapping`
- `file.read`
- `file.exists`
- `file.readJSON`
- `file.readYAML`
- `file.mkdir`

### `util.reqfn(rootDir)`

Returns a function that, when called, will require a module relative to `rootDir`.

     // Returned Function
     /**
     * Requires a file from the relative root passed to the function's generator.
     *
     * @param  {String} pathToModule    relative path to module from rootDir passed to generator
     * @param  {Bool}   fromRoot        (optional) if passed, the rootDir will be
     *                                  ignored. This is a convenient way to load
     *                                  a module relative to your project's root.
     * @return {Object}                 result of calling
     *                                  require([rootDir/]pathToModule)
     */

### `util.pth`

Like path.join, but returns an absolute path to the referenced location.

```javascript
util.pth('grunt/config/file.json'); // returns /path/to/repo/grunt/config/file.json
util.pth('grunt', 'config', 'file.json'); // also returns /path/to/repo/grunt/config/file.json
util.pth('grunt/', '/config', '//', '/file.json'); // also returns /path/to/repo/grunt/config/file.json
```

### `util.loadAppSettings(<defaultSettingsPath>, <userSettingsPath>)`

Function that returns a configuration given a path to a file in which defaults are specified, and a path to a file in which user overrides are specified. Resulting object is defaultSettings object with userSettings object overriding.

Arguments default to `config/default-settings.js` and `config/settings.js`, respectively.

### `util.stripYamlFront(fileContents)`

Given the contents of a file, return its contents without the YAML front matter.

### `util._deepExtend(_)`

Extends the passed instance of `_` with a deepExtend function, which works like extend, but does so recursively.


# Version History

- v0.1.0 - Initial release
- v0.1.1 - added `util.reqFn`, `util.pth`, and `util.loadAppSettings`
- v0.1.2 - added `util.stripYamlFront`
- v0.1.4 - added `util.ucwords`
- v0.1.5 - added `util._deepExtend`
