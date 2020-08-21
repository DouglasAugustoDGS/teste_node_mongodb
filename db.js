const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb+srv://<your_user>:<your_password>@<mongodb_cluster_url>/<db_name>')
    .then(conn => global.conn = conn.db("db_test"))
    .catch(err => console.log(err));

function findAllCustomers(callback){
    global.conn.collection('customers').find({}).toArray(callback);
}

function findAllUsers(callback){
    global.conn.collection('users').find({}).toArray(callback);
}

function insertCustomer(customer, callback){
    if(customer !== []){
    global.conn.collection('customers').insert(customer, callback);
    }
}

async function insertUser(user, callback){
    if(user !== []){
    const salt = await bcrypt.genSalt();
    user.senha = await bcrypt.hash(user.senha, salt);
    global.conn.collection('users').insert(user, callback);
    }
}

function deleteOneCustomer(id, callback){
    global.conn.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

function deleteOneUser(id, callback){
    global.conn.collection("users").deleteOne({_id: new ObjectId(id)}, callback);
}

function findOneUser(user, callback){
    global.conn.collection("users").find({email: user.email}).toArray(callback);
}

module.exports = { findAllCustomers, findAllUsers, insertCustomer, insertUser, deleteOneCustomer, deleteOneUser, findOneUser }