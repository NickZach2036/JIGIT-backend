import sequelize from './sequelize_setup.js';

dropTable();
async function dropTable(){
    await sequelize.drop();
}