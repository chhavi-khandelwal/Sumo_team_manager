var app = angular.module('teammanager', []);

app.controller('AppController', ['$scope', '$http', function ($scope, $http) {

	$scope.team = [];
	$scope.employees = [];
	var team;

	$http.get("/app/data/team.json").then(function (team) {
		$scope.teamData = team.data;

		$scope.team = $scope.teamData.map(function (teamInfo) {
			return teamInfo.team;
		});
	});

	// get Teams
	$scope.getTeams = function () {
		return $scope.teamData.map(function (teamInfo) {
			return teamInfo.team;
		});
	};

	// get employees of selected team
	$scope.getEmployees = function () {
		if (!$scope.teamData) { return; }

		team = $scope.teamData.filter(function (teamInfo) {
			return teamInfo.team === $scope.teamInputName;
		});
		return team && team[0] && team[0].employees;
	};

	// on dialogue box close
	$scope.closeDialogue = function (e) {
		e.preventDefault();
		var confirmation;
		if ($scope.teamMemberName || $scope.teamInputName) {
			confirmation = confirm('Are you sure you want to cancel?');
		}
		if (confirmation) {
			$scope.teamDialogue.$error = {};
			$scope.setFormPristine();
		}
	};

	// validate form before submission
	$scope.submitDialogue = function () {
		var selectedTeam = [];
		selectedTeam = $scope.teamData.filter(function (teamInfo) {
			return teamInfo.team === $scope.teamInputName;
		});

		if ($scope.team.indexOf($scope.teamInputName) === -1) {
			$scope.teamDialogue.$error['invalidTeamInput'] = 'Invalid Team Name';
		}
		else {
			$scope.teamDialogue.$error = {};
		}

		if ($scope.teamDialogue.$error.invalidTeamInput || (selectedTeam[0] && selectedTeam[0].employees.indexOf($scope.teamMemberName) === -1)) {
			$scope.teamDialogue.$error['invalidEmployeeInput'] = 'Invalid Employee Name';
			return;
		}
		else {
			$scope.teamDialogue.$error = {};
		}
	};

	$scope.setFormPristine = function () {
		$scope.teamMemberName = '';
		$scope.teamInputName = '';
		$scope.welcomeEmail = false;
		$scope.teamDialogue.$setPristine();
	};

	//submit form if valid
	$scope.submitTeamDialogue = function ($event) {
		$event.preventDefault();
		if (!Object.keys($scope.teamDialogue.$error).length) {
			$scope.setFormPristine();
			alert('Form Submitted');
		}
	};

	$scope.$watch('teamMemberName', function () {
		$scope.employees = $scope.getEmployees();
	});

}]);
