import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({
    database: 'test',
    username: 'backend',
    password: 'int€rn$hip2024',
    host: 'localhost',
    port: 6543,
    dialect: 'postgres'
});
export default sequelize;