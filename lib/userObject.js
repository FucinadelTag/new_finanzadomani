var __ = require('underscore');
var AccessToken   = require('../models/AccessToken');
var ManagementClient = require('auth0').ManagementClient;

class userObject {

    constructor (user){
        this.userData = user;
        this.setIsAbbonato();
        this.setIsCliente();
        this.setIsStaff();
    }

    getAuth0Token () {
        let promiseToken =  AccessToken.
                            findOne().
                            where('servizio').equals('auth0').
                            exec();

        return promiseToken;
    }

    getAuth0ManagmentClient (){

        let promiseToken = this.getAuth0Token ();

        return (

            promiseToken.then (function (document){
                let auth0ManagementClient = new ManagementClient({
                    token: document.access_token,
                    domain: 'finanzadomani.eu.auth0.com'});

                    return auth0ManagementClient;
                })
            )

        // let promiseToken = new ManagementClient({
        // token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik16ZEdRalJFT1RBNU0wVTJSRGczUVRaQk4wRXhNekV3T1RKQlFqSTFNRVF3TTBGRk5VTXhOdyJ9.eyJpc3MiOiJodHRwczovL2ZpbmFuemFkb21hbmkuZXUuYXV0aDAuY29tLyIsInN1YiI6ImdBcGh1cUdGNWdqY1dCcDEwbnFHaWVnNDRjRE10Z2VtQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2ZpbmFuemFkb21hbmkuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJleHAiOjE1MjE1MzEyOTksImlhdCI6MTQ4OTk5NTI5OSwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMifQ.QulK6KYC-HLYfjYINdGA_XEOx9FPw4rBvdleJsZNtlQ3hfmTjQXtnw6atxxGeYHlmv3McVFAPviH_2BsDzQv0DOWrVd4maLk6J0-EFKn97uJAYGhjzgMKD2hkXj_9lvfxRH5v_-VTHmGmpw8GPf__orNp2KyuD8UW0AxUW0klmbUPRyWRWBijfRbP-u_BJkPZGhXLUYi366EzD0YZSU3D2hSWUB_WYVsxpooiPvqYxMPHwzhxyzQRbrX2z9aY3Uc4gS3icJhoHN4mmwv5oo0mAaDpdLs5SSWA2p4VjhlWCKiUvyKwSxNg6j4jJN_PZYkuG8mZnn3CkY0kmqMZ8vquw',
        // domain: 'finanzadomani.eu.auth0.com'
        // });
    }

    getAuth0User (){
        let auth0ClientPromise = this.getAuth0ManagmentClient ();

        console.log (auth0ClientPromise);

        auth0ClientPromise.then (function (auth0Client){
            auth0Client.getUser({ id: this.userData.user_id})
              .then(function (user) {
                console.log(user);
              })
              .catch(function (err) {
                console.log(err);
              });
        });






        //   });
          //   var metadata = {
          //       prova: 'PPPP'
          //   };

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