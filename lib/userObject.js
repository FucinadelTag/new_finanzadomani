var __ = require('underscore');

class userObject {

    constructor (user){
        this.userData = user;
    }

    getUserData (){
        return this.userData;
    }


    getNomeCognome () {
        return this.userData.displayName;
    }

    inGroup (groupName){
        let arrayGroups = this.userData._json.authorization.groups;

        if (__.contains(arrayGroups, groupName)){

            return true
        } else {
             return false
        }
    }

}


module.exports = userObject;