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

  $scope.check_user_id = function (user_id){
    if (user_id) {
      return user_id.match(/^ur\d{8}$/) !== null;
    }
    return user_id;
  };

  $scope.addMessage = function (type, message) {
    $('#alerts').append('<div class="alert alert-' + type + '">' + message + '</div>');
  };

  $scope.updating = false;

  $scope.fetchMovieList = function (user_id) {
    $('#alerts').html('');
    $scope.updating = true;
    if (!$scope.check_user_id(user_id)) {
      $scope.addMessage('warning', 'The entered user_id is not valid. The whole list will be fetched');
    }
    $.getJSON('/api/' + user_id, function (data) {
      $scope.movies = data.todo; 
      $scope.updating = false;
      $scope.safeApply();
    });
  };


}]);
