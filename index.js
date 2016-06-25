'use strict';

const path = require('path');
const fs = require('fs-extra');
const childProcess = require('child_process');
const spawn = childProcess.spawn;
const kill = require('tree-kill');
const listenAndInit = /\[initandlisten\].+?port\s(\d{1,})/;

module.exports = function (options, callback) {
	
	if (!callback && typeof options === 'function') {
		callback = options;
		options = null;
	}

	options = options || {};
	const DB_PATH = options.dbpath || path.resolve('./data/db');
	const logger = options.logger || () => {};
	const error = logger.error || logger;

	try {
		fs.mkdirsSync(DB_PATH);
	} catch (e) { 
		error(`MONGOD Error creating db at ${DB_PATH}`); 
		logger(e); 
	}

	const args = ['--dbpath', DB_PATH];

	const mongod = spawn('mongod', args);
	logger(`MONGOD started -- pid = ${mongod.pid}`);

	function killMongod (code) {
		kill(mongod, code);
		logger(`MONGOD closed: ${code}`);
	}

	mongod.on('close', (c) => logger(`MONGOD closed with code ${c}`));

	process.on('exit', killMongod);

	mongod.stdout.on('data', (d) => {
		logger(`MONGOD STDOUT: ${d}`);
		const listening = listenAndInit.exec(d);
		if (listening) {
			logger(`MONGOD listening on port ${listening[1]}`)
			callback(null, {
				child: mongod,
				kill: killMongod
			});
		}
	});

	mongod.stderr.on('data', (d) => {
		logger(`MONGOD STDERR: ${d}`);
		callback(d);
	});

	return mongod;
}