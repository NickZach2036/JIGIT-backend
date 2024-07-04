const { Model } = require('sequelize');
const User = require('./setup-model');
const sequelize = require('./sequelize');

dropTable();
async function dropTable(){
    await sequelize.drop();
}