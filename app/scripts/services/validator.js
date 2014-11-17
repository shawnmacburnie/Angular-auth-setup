'use strict';

angular.module('selfStatsApp')
    .factory('Validator', function(Restangular) {
        var EMAIL_VALIDATION = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return {
            checkEmail: function(email) {
                return email && EMAIL_VALIDATION.test(email);
            },
            checkPhoneNumber: function(number) {
                var targ = (number ? number:"").replace(/[^\d]/g, '');
                return targ.length === 10 || targ.length === 7;
            },
            checkString: function(text, minLength) {
                if(minLength) {
                    return text && text >= minLength;
                }
                return text;
            }
        };
    });