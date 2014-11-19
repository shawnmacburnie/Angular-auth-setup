'use strict';

angular.module('selfStatsApp').factory("ResolverService", function($q, UserAuthentication) {
    return function() {
        var userInfo = UserAuthentication.getUserInfo();

        if (userInfo) {
            return $q.when(userInfo);
        } else {
            return $q.reject({
                authenticated: false
            });
        }
    }
});