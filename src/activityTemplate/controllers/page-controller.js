import $ from "jquery"
import angular from "angular"

angular
    .module('activityPlayTypeModule', [
    ])
    .run(function ($rootScope) {
      $rootScope.b = '22'
    })
    .controller('activityPlayTypeCtrl', [
        '$scope',
        '$rootScope',
        function ($scope, $rootScope) {
            $scope.a = '1';
        }
    ]);

export default {
  init: function () {
    angular.bootstrap(document, ['activityPlayTypeModule']);
  }
};
