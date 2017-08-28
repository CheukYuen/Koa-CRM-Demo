(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['UserService', '$rootScope'];
  function HomeController(UserService, $rootScope) {
    var vm = this;

    vm.user = null;
    vm.allUsers = [];
    vm.deleteUser = deleteUser;

    initController();

    function initController() {
      loadCurrentUser();
      // loadAllUsers();
    }

    function loadCurrentUser() {
      UserService.GetUserInfo()
        .then(function (userData) {
          console.log('userData', userData);
          vm.user = userData.data;
        });
    }

    function loadAllUsers() {
      UserService.GetAll()
        .then(function (users) {
          vm.allUsers = users;
        });
    }

    function deleteUser(id) {
      UserService.Delete(id)
        .then(function () {
          loadAllUsers();
        });
    }
  }

})();