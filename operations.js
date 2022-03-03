const assert = require('assert').strict;
//set 4 methods will export
//1st insert doc method, i.e create
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);//declared constant var named coll (short for collection) will use collection method of db obj that we passed in and the collection name, can now use coll const to interact w/specific collection in mongodb server
    coll.insertOne(document, (err, result) => {//used api insertOne method
        assert.strictEqual(err, null);
        callback(result);//pass result obj into callback f(x) named callback that was passed in as arg to insert doc method; this callback defined somewhere else where a call to insertDocument() made, now delivering result to this callback to do what programmed to do 
    });
};
//2nd find doc method will export to list all the docs, i.e. read
exports.findDocuments = (db, collection, callback) => {//removed doc param b/c don't use
    const coll = db.collection(collection);//access collection f/mongodb into const coll
    coll.find().toArray((err, docs) => {//find all docs in this collection, use toArray() to put all the docs found into an array
        assert.strictEqual(err, null);
        callback(docs);//take docs array and run this callback rec as arg
    });
};
//3rd remove doc method, i.e. delete
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {//use deleteOne method
        assert.strictEqual(err, null);
        callback(result);//call callback f(x) passed into removeDoc() and give result f/deleteOne() which will be an obj w/info about what was deleted
    });
};
//4th update doc method
exports.updateDocument = (db, document, update, collection, callback) => {//has extra param for update want to make
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {//use updateOne() has 4 param
        //2nd param update operator ($set) then update obj-will use update obj to write over existing info
        assert.strictEqual(err, null);
        callback(result);
    });
};