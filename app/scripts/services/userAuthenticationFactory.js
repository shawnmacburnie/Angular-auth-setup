angular.module('selfStatsApp').factory("UserAuthentication", function($http, $q, $window) {
  var userInfo;

  function init() {
    if ($window.sessionStorage["userInfo"]) {
      userInfo = JSON.parse($window.sessionStorage["userInfo"]);
    }
  }

  init();

  function login(userName, password) {
    var deferred = $q.defer();

    // implement when I have a server
    // $http.post("/api/login", {
    //   userName: userName,
    //   password: password
    // }).then(function(result) {
    //   userInfo = {
    //     accessToken: result.data.access_token,
    //     userName: result.data.userName
    //   };
    //   $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
    //   deferred.resolve(userInfo);
    // }, function(error) {
    //   deferred.reject(error);
    // });

    // --------- temp --------
    userInfo = {
      accessToken: userName + ":" + password,
      userName: userName
    };
    $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
    deferred.resolve(userInfo);

    // --------- end temp --------
    return deferred.promise;
  }

  function getUserInfo() {
    return userInfo;
  }

  return {
    login: login,
    getUserInfo: getUserInfo
  };
});