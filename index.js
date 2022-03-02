//reguired mongodb node.js driver & in MongoClient obj f/it
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
//to set up connection to mongodb server
const url = 'mongodb://localhost:27017/';//url to access mongodb server at port #
const dbname = 'nucampsite'; //name of database want to connect to
//to access the server use: MongoClient.connect method
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);//like if err===null then quit otherwise cont

    console.log('Connected correctly to server');

    const db = client.db(dbname);//this method will connect us to nucampsite db on mongodb server, can use db obj to access set of methods to interact with db

    //(drop=delete)having delete so easier for testing, not usual operation
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        //recreate campsite collection and get access to it through setting const collection obj
        const collection = db.collection('campsites');
        //insert a document into this colleciton using collecion obj just created
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {//callback pattern w/err handling convention for node
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);//ops property short for operations
            //print to console all documents now in this collection, give empty () to find all
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);
                //will immediately close clients connection to mongodb server
                client.close();
            });
        });
    });
});