lz-node-utils
=============

Useful utility functions for node.

# Usage

```bash
npm install --save lz-node-utils
```

```javascript
var util = require( 'lz-node-utils' );
```

## Methods

### `util.file`

The following were taken from [`grunt.file`](https://github.com/gruntjs/grunt/blob/master/lib/grunt/file.js), with the grunt dependency removed.

**THEY ARE ALL SYNCHRONOUS**

- `file.expand`
- `file.expandMapping`
- `file.read`
- `file.exists`
- `file.readJSON`
- `file.readYAML`
- `file.mkdir`

### `util.pth`

Like path.join, but returns an absolute path to the referenced location.

```javascript
util.pth('grunt/config/file.json'); // returns /path/to/repo/grunt/config/file.json
util.pth('grunt', 'config', 'file.json'); // also returns /path/to/repo/grunt/config/file.json
util.pth('grunt/', '/config', '//', '/file.json'); // also returns /path/to/repo/grunt/config/file.json
```

**Disclaimer**

The absolute path returned is determined by prepending `process.cwd()` to the arguments that are passed to the function, and passing the result to `path.join()`. This is known to be effective for locally developed node applications, but has not been tested in a server environment, for globally installed npm modules, or in a Dockerized environment. Use at your own risk, but also if you run into an issue, let me know. I'd like this to be more versitle.

### `util.getReqfn(rootDir)`

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

**Note**

This function relies on `util.path()` under the hood, so please be aware of the disclaimer (above) if using `util.getReqFn()`.

### `util.copyObj(obj [, shallow])`

Return a copy of the passed object. Pass true as the second argument to make the copy shallow. By default, a deep copy will be performed using the `_.deepExtend` function.

### `util._deepExtend(_)`

Extends the passed instance of `_` with a deepExtend function, which works like extend, but does so recursively.

### `util.loadAppSettings(<defaultSettingsPath>, <userSettingsPath>)`

Function that returns a configuration given a path to a file in which defaults are specified, and a path to a file in which user overrides are specified. Resulting object is defaultSettings object with userSettings object overriding.

Unlike most libraries' extend function, this works with nested settings objects. It uses the `deepExtend()` function added to underscore by `util._deepExtend()`

Arguments default to `config/default-settings.js` and `config/settings.js`, respectively.

### `util.stripYamlFront(fileContents)`

Given the contents of a file, return its contents without the YAML front matter.

### `util.expandSourceFiles(sourceFiles)`

The **`sourceFiles`** argument should be an object containing key/value pairs, where each value specifies a set of files associated with the given key.

You can specify values in 1 of 3 ways:

1. string - `'templates/**/*.tmpl'`
2. array - `[ 'templates/**/*.tmpl', 'templates/**/*.handlebars' ]`
3. object - This will be converted to an array of string (argument type 2), where each value corresponds to a value in src with cwd prepended to it.
```javascript
{
     cwd: 'templates/',
     src: '**\/*.tmpl' // can also be an array
}
```

This argumt ultimately gets passed to `util.file.expand()` to build out a list of existing files that match the passed argument.

Each key in sourceFiles will be converted to an object of the form:
```javascript
{ contents: <file contents>,
  path: <relative path to file from cwd>,
  fqp: <fully qualified path to file>
}
```

**Example**

```javascript
// if in templates/ directory you have template1.tmpl and template2.tmpl

util.expandSourceFiles({
     templates: [ 'templates/**/*.tmpl' ]
});

// returns [ 'templates/template1.tmpl', 'templates/template2.tmpl' ]
```

