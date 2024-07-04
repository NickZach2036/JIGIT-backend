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

<<<<<<< HEAD
export default User;  
=======
export default User;  
>>>>>>> 280e6534b77ffc688cb963c7b2824215d685d873
