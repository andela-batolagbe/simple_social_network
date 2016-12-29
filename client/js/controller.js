(function() {
  'use strict';

  angular.module('socialApp')
    .controller('MainCtrl', ['$scope', 'MainService', '$state', 'Upload', '$localStorage', 'ngToast',
    function HomeCtrl($scope, MainService, $state, Upload, $localStorage, ngToast) {

      $scope.addPost = addPost;
      $scope.getPosts = getPosts;
      init();

      function init() {
        if ($localStorage.userDetails) {
          $scope.returningUser = true;
          $scope.user = $localStorage.userDetails;
        } else {
          $scope.returningUser = false;
          $scope.user = {}
        }
        getPosts()
      }

      function addPost() {
        if ($scope.returningUser) {
          var post = {
            user: $scope.user._id,
            text: $scope.postText
          }

          MainService.createPost(post)
          .then(function(data) {
            $state.reload();
            ngToast.success({
              content: data.message,
              timeout: 3000
            });
          })
          .catch(function(e) {
            ngToast.danger({
              content: e.message,
              timeout: 3000
            });
          })
        } else {

          var avatar = $scope.avatar;
          var user = {
            username: $scope.username
          };

          ngToast.info({
            content: 'Creating your account....',
            timeout: 20000
          });

          MainService.createUser(avatar, user)
          .then(function(data) {
            $localStorage.userDetails = data.user;
            $scope.user = data.user;

            ngToast.dismiss();
            ngToast.info({
              content: 'Your account has been created, adding your post.....',
              timeout: 3000
            });

            var post = {
              user: data.user._id,
              text: $scope.postText
            }

            MainService.createPost(post)
            .then(function(postData) {
              $state.reload();

              ngToast.dismiss();
              ngToast.success({
                content: data.message,
                timeout: 3000
              });
            })
            .catch(function(e) {

              ngToast.dismiss();
              ngToast.danger({
                content: e.message,
                timeout: 3000
              });
            })
          })
          .catch(function(e) {

            ngToast.dismiss();
            ngToast.danger({
              content: e.message,
              timeout: 3000
            });
          })
        }
      }

      function getPosts() {
        MainService.getPosts()
        .then(function(data) {
          $scope.posts = data.posts
        })
        .catch(function(e) {
          ngToast.danger({
            content: e.message,
            timeout: 3000
          });
        });
      }
    }
  ]);
})();