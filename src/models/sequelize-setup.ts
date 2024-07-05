import { Sequelize } from 'sequelize';
import {
  databasePort,
  postgresDb,
  postgresHost,
  postgresPassword,
  postgresUser,
} from '../constants';

export const sequelize = new Sequelize({
  database: postgresDb,
  username: postgresUser,
  password: postgresPassword,
  host: postgresHost,
  port: Number(databasePort),
  dialect: 'postgres',
});
