//reguired mongodb node.js driver & in MongoClient obj f/it
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
//require the operations module assign to const dboper (short for database operations) and now have access to 4 methods in operations module thorugh dboper obj
const dboper = require('./operations');
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

        //replaced call to collection.insertOne method to instead use the dboper.insertDoc()
        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
            'campsites', result => {
            //in param list below we're defining a callback f(x) which won't be called till later-this part is f(x) def-code in it doesn't run here, will run later at end of insertDoc f(x) when called
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test Description" }, 'campsites',
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found Documents:', docs);

                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);

                                    //will immediately close clients connection to mongodb server
                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});