//refactored index.js to use promises
//removed require assert, were using for error handling but promises have blt-in
const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite'; 
//end param list ) in connect f(x), method call completed after ),chain the promise .then method and will return client as value
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
    //removed assert to ck for errors, use catch method
    console.log('Connected correctly to server');

    const db = client.db(dbname);

    //removed callback def, chained then method to it that rec result as promise, removed assert use catch
    db.dropCollection('campsites')
    .then(result => {
        console.log('Dropped Collection:', result);
    })
    .catch(err => console.log('No collection to drop.'));

    dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites')
    .then(result => {
        console.log('Insert Document:', result.ops);

        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:', docs);

        return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test Description" }, 'campsites');
    })
    .then(result => {
        console.log('Updated Document Count:', result.result.nModified);

        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:', docs);

        return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
            'campsites');
    })
    .then(result => {
        console.log('Deleted Document Count:', result.deletedCount);

        return client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
})
.catch(err => console.log(err));