const User = require('./setup-model');
User.destroy({
    where:{
        id : 2,
    }
});