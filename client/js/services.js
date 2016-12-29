'use strict';

angular.module('socialApp')
.factory('MainService', ['$http', '$q', '$localStorage', 'Upload',
  function ServerRequest($http, $q, $localStorage, Upload) {

    var API_URL = '/api/';
    return {
      createUser: createUser,
      createPost: createPost,
      getPosts: getPosts
    };

    function createUser(file, userObj) {

      return $q(function(resolve, reject) {
        Upload.upload({
          url: API_URL + 'createUser',
          data: {
            avatar: file,
            username: userObj.username
          },
          method: 'POST'
        })
        .then(function(response){
          resolve(response.data)
          }, function(response){
          reject(response.data)
        });
      })
    }

    function createPost(postObj) {
      if (!postObj) {
        postObj = {}
      }
      return $q(function(resolve, reject) {
        $http({
          url: encodeURI(API_URL + 'createPost'),
          method: 'POST',
          data: postObj
        })
        .then(function(response) {
          resolve(response.data);
          },
          function(response) {
            reject(response.data);
        });
      })
    }

    function getPosts() {
      return $q(function(resolve, reject) {
        $http({
          url: encodeURI(API_URL + 'getPosts'),
          method: 'GET'
        })
        .then(function(response) {
            resolve(response.data);
          },
          function(response) {
            reject(response.data);
        });
      })
    }
}]);
