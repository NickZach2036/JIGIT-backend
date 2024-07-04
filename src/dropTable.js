import sequelize from './sequelize-setup.js';

dropTable();
async function dropTable(){
    await sequelize.drop();
}