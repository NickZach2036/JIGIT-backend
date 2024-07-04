import { DataTypes } from 'sequelize' ;
import sequelize from './sequelize_setup.js';
 

const User = sequelize.define(
    'user',
    {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
        },
        username : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            unique: true,
        },
        carNumber : {
            type: DataTypes.STRING
        }
    },
);

export default User;




  