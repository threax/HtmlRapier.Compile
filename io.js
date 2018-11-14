"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs-extra');
/**
 * This is a wrapper for a promise that exposes the resolve
 * and reject functions.
 */
var ExternalPromise = /** @class */ (function () {
    function ExternalPromise() {
        var _this = this;
        this._promise = new Promise(function (resolve, reject) {
            _this.resolveCb = resolve;
            _this.rejectCb = reject;
        });
    }
    ExternalPromise.prototype.resolve = function (data) {
        this.resolveCb(data);
    };
    ExternalPromise.prototype.reject = function (error) {
        this.rejectCb(error);
    };
    Object.defineProperty(ExternalPromise.prototype, "Promise", {
        get: function () {
            return this._promise;
        },
        enumerable: true,
        configurable: true
    });
    return ExternalPromise;
}());
exports.ExternalPromise = ExternalPromise;
;
function readFile(path) {
    var ep = new ExternalPromise();
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
    var ep = new ExternalPromise();
    fs.writeFile(path, data, function (err) {
        if (err) {
            return ep.reject(err);
        }
        ep.resolve();
    });
    return ep.Promise;
}
exports.writeFile = writeFile;
