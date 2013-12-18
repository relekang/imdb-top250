app.controller('listViewController', ['$scope', function ($scope) {

  'use strict';

  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  $scope.updating = false;

  $scope.fetchMovieList = function (user_id) {
    $scope.updating = true;
    $.getJSON('/' + user_id, function (data) {
      $scope.movies = data.todo; 
      $scope.updating = false;
      $scope.safeApply();
    });
  };


}]);
