var fs = require('fs-extra');

/**
 * This is a wrapper for a promise that exposes the resolve
 * and reject functions.
 */
export class ExternalPromise<T> {
    private resolveCb;
    private rejectCb;
    private _promise : Promise<T>;

    constructor(){
        this._promise = new Promise<T>((resolve, reject) => {
            this.resolveCb = resolve;
            this.rejectCb = reject;
        });
    }

    resolve(data?:T){
        this.resolveCb(data);
    }

    reject(error){
        this.rejectCb(error);
    }

    get Promise(){
        return this._promise;
    }
};

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