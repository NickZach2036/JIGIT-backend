import { Sequelize } from 'sequelize';
import 'dotenv/config';
const sequelize = new Sequelize({
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres'
});
export default sequelize;