lz-node-utils
=============

Useful utility functions for node

## Usage

```bash
npm install --save-dev git+http://git@github.com/lzilioli/lz-node-utils.git
```

```javascript
  var util = require( 'lz-node-utils' );
  // Identical to grunt.file.expand without the grunt dependancy
  util.file.expand([ /* list of file patterns */ ]);
  // Will check if pathToFile exists, if not, will console.log a message, and return ''
  // if so, returns the file's contents
  util.file.read(pathToFile);
```
