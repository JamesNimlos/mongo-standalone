### mongo-standalone
[![npm](https://img.shields.io/npm/l/mongo-standalone.svg?maxAge=2592000)](https://www.npmjs.com/package/mongo-standalone)
[![npm](https://img.shields.io/npm/v/mongo-standalone.svg?maxAge=2592000)](https://www.npmjs.com/package/mongo-standalone)
[![npm](https://img.shields.io/npm/dm/mongo-standalone.svg?maxAge=2592000)](https://www.npmjs.com/package/mongo-standalone)
[![npm](https://img.shields.io/npm/dt/mongo-standalone.svg?maxAge=2592000)](https://www.npmjs.com/package/mongo-standalone)

This is a javascript method that allows for control of the command-line 
based `mongod` instance from a node.js app. MongoDB must be downloaded 
and the `mongod` command available in your PATH.

[Installing MongoDB](https://docs.mongodb.com/manual/installation/)

#### Install:
`npm install --save mongo-standalone`

#### Usage:
```javascript
const MongoDB = require('mongo-standalone');
const mongodOptions = {
  dbpath: path.resolve('./data/db')
};

const mongod = MongoDB(mongodOptions, function (err, inst) {
  if (err) {
    process.exit();
    return;
  }

  // inst.child === mongod which is returned from the function
  // inst.kill === kill(mongod) using the tree-kill package
});
```

This code is UNTESTED in a production environment.

Released under the [MIT license](https://opensource.org/licenses/MIT)