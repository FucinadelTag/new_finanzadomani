var __ = require('underscore');

class userObject {

    constructor (user){
        this.userData = user;
        this.setIsAbbonato();
        this.setIsCliente();
        this.setIsStaff();
    }

    getUserData (){
        return this.userData;
    }


    getDisplayName () {
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

    hasRole (roleName){
        let arrayRoles = this.userData._json.authorization.roles;

        if (__.contains(arrayRoles, roleName)){

            return true
        } else {
             return false
        }
    }

    setIsAbbonato (){
        let arrayRoles = this.userData._json.authorization.roles;

        this.isAbbonato = false;

        if (__.contains(arrayRoles, 'Abbnonato')){

            this.isAbbonato = true;
        }

        let arrayGroups = this.userData._json.authorization.groups;

        if (__.contains(arrayGroups, 'Staff')){

            this.isAbbonato = true;
        }

        //console.log (this.isAbbonato);
    }

    setIsCliente (){

        let arrayGroups = this.userData._json.authorization.groups;

        this.isCliente = false;

        if (__.contains(arrayGroups, 'Clienti')){

            this.isCliente = true;
        }

        //console.log (this.isAbbonato);
    }

    setIsStaff (){

        let arrayGroups = this.userData._json.authorization.groups;

        this.isStaff = false;

        if (__.contains(arrayGroups, 'Staff')){

            this.isStaff = true;
        }

        //console.log (this.isAbbonato);
    }



}


module.exports = userObject;