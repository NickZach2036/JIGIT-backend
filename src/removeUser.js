import  User from './setup-model.js';
User.destroy({
    where:{
        id : 2,
    }
});