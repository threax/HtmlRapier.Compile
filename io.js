"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs-extra');
var externalPromise_1 = require("./externalPromise");
/**
 * Get the node fsstat results for a path. This will return promise.
 */
function fsstat(path) {
    var ep = new externalPromise_1.ExternalPromise();
    fs.stat(path, function (err, stats) {
        if (err) {
            return ep.reject(err);
        }
        ep.resolve(stats);
    });
    return ep.Promise;
}
exports.fsstat = fsstat;
function ensureFile(path) {
    var ep = new externalPromise_1.ExternalPromise();
    fs.ensureFile(path, function (err) {
        if (err) {
            return ep.reject(err);
        }
        ep.resolve(undefined);
    });
    return ep.Promise;
}
exports.ensureFile = ensureFile;
function ensureDir(path) {
    var ep = new externalPromise_1.ExternalPromise();
    fs.ensureDir(path, function (err) {
        if (err) {
            return ep.reject(err);
        }
        ep.resolve(undefined);
    });
    return ep.Promise;
}
exports.ensureDir = ensureDir;
function copy(src, dest) {
    var ep = new externalPromise_1.ExternalPromise();
    fs.copy(src, dest, function (err) {
        if (err) {
            return ep.reject(err);
        }
        ep.resolve();
    });
    return ep.Promise;
}
exports.copy = copy;
function readFile(path) {
    var ep = new externalPromise_1.ExternalPromise();
    fs.readFile(path, function (err, data) {
        if (err) {
            return ep.reject(err);
        }
        ep.resolve(data);
    });
    return ep.Promise;
}
exports.readFile = readFile;
function writeFile(path, data) {
    var ep = new externalPromise_1.ExternalPromise();
    fs.writeFile(path, data, function (err) {
        if (err) {
            return ep.reject(err);
        }
        ep.resolve();
    });
    return ep.Promise;
}
exports.writeFile = writeFile;
function emptyDir(path) {
    var ep = new externalPromise_1.ExternalPromise();
    fs.emptyDir(path, function (err, data) {
        if (err) {
            return ep.reject(err);
        }
        ep.resolve(data);
    });
    return ep.Promise;
}
exports.emptyDir = emptyDir;
