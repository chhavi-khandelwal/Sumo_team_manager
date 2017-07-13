define('controllers/LoginController', ['app'], function (app) {
	'use strict';

	function LoginController($scope, $http) {
		$scope.login = function() {
			$http.post('/login', { email: $scope.email, password: $scope.password })
			.success(function (data) {
              localStorage.email = data.email;
            })
            .error(function (data, status, header, config) {
            	alert('Log In Failed');
            });
		};
	}

	LoginController.$inject = ['$scope', '$http'];

	app.controller('LoginController', LoginController);
});