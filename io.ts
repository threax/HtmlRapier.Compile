var fs = require('fs-extra');
import {ExternalPromise} from './externalPromise';

interface NodeStats{
    isFile();
    isDirectory();
}

/**
 * Get the node fsstat results for a path. This will return promise.
 */
export function fsstat(path): Promise<NodeStats>{
    var ep = new ExternalPromise<NodeStats>();

    fs.stat(path, (err, stats) =>{
        if(err){ return ep.reject(err); }
        ep.resolve(stats);
    });

    return ep.Promise;
}

export function ensureFile(path: string): Promise<any>{
    var ep = new ExternalPromise();
    fs.ensureFile(path, err =>{
        if (err){ return ep.reject(err); }
        ep.resolve(undefined);
    });
    return ep.Promise;
}

export function ensureDir(path: string): Promise<any>{
    var ep = new ExternalPromise();
    fs.ensureDir(path, err =>{
        if (err){ return ep.reject(err); }
        ep.resolve(undefined);
    });
    return ep.Promise;
}

export function copy(src: string, dest: string){
    var ep = new ExternalPromise();
    fs.copy(src, dest, 
        err => {
            if (err){ return ep.reject(err); }
            ep.resolve();
        });
    return ep.Promise;
}

export function readFile(path: string): Promise<any>{
    var ep = new ExternalPromise();
    fs.readFile(path, (err, data) => {
        if (err){ return ep.reject(err); }
        ep.resolve(data);
    });
    return ep.Promise;
}

export function writeFile(path: string, data: any){
    var ep = new ExternalPromise();
    fs.writeFile(path, data, 
        (err) => {
            if (err){ return ep.reject(err); }
            ep.resolve();
        });
    return ep.Promise;
}

export function emptyDir(path: string): Promise<any>{
    var ep = new ExternalPromise();
    fs.emptyDir(path, (err, data) => {
        if (err){ return ep.reject(err); }
        ep.resolve(data);
    });
    return ep.Promise;
}