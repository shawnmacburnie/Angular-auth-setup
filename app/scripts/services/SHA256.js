'use strict';

angular.module('selfStatsApp').factory("SHA256", function($q, $http) {
    var salt = "Phar!etra!TristiqueEges#tasElitCu12rsus"
    return {
        hash: function(message) {
            var h = CryptoJS.SHA256(message + salt);
            //jalert(h);
            return h.toString(CryptoJS.enc.Hex);
        }

    };
});