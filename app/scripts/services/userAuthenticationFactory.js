angular.module('selfStatsApp').factory("UserAuthentication", function($http, $q, $window,$state) {
  var userInfo;

  function init() {
    var info = JSON.parse($window.sessionStorage["userInfo"]);
    if (info) {
      $http.defaults.headers.post.Authorization = info.accessToken;
      $http.post("http://localhost:3000/authenticate").then(function(result){
        userInfo = {
          accessToken: result.data.accessToken,
          user: result.data.user
        }
        console.log(userInfo);
        $http.defaults.headers.post.Authorization = result.data.accessToken;
        $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
        $state.go("home");
      });
    }
  }

  function login(username, password) {
    var deferred = $q.defer();


    $http.post("http://localhost:3000/login", {
      username: username,
      password: password
    }).then(function(result) {
      if (result.data.ERROR) {
        deferred.reject(result.ERROR);
      } else {
        userInfo = {
          accessToken: result.data.accessToken,
          username: result.data.username
        };
        $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
        deferred.resolve(userInfo);
      }
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  function logout() {
    var deferred = $q.defer();

    $http({
      method: "POST",
      url: "http://localhost:3000/logout"
    }).then(function(result) {
      $window.sessionStorage["userInfo"] = null;
      userInfo = {};
      deferred.resolve(result);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  function getUserInfo() {
    return userInfo ? userInfo.user : userInfo;
  }

  function getHeaders() {
    return userInfo ? userInfo.accessToken : userInfo;
  }

  return {
    init: init,
    login: login,
    getUserInfo: getUserInfo,
    logout: logout
  };
});