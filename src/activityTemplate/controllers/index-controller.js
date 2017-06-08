import $ from "jquery"
import angular from "angular"

angular
    .module('activityPlayTypeModule', [
    ])
    .run(function ($rootScope) {
      $rootScope.b = 'dfsdaf'
    })
    .controller('activityPlayTypeCtrl', [
        '$scope',
        '$rootScope',
        function ($scope, $rootScope) {
            $scope.a = '1122dfdf11';
        }
    ]);

export default {
  init: function () {
    angular.bootstrap(document, ['activityPlayTypeModule']);
  }
};
