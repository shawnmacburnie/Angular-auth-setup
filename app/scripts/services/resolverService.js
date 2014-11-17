'use strict';

angular.module('selfStatsApp').factory("ResolverService", function($q, authenticationSvc) {
    return function() {
        return {
            auth: function() {
                var userInfo = authenticationSvc.getUserInfo();

                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    console.log("no auth");
                    return $q.reject({
                        authenticated: false
                    });
                }
            }
        }
    }
});