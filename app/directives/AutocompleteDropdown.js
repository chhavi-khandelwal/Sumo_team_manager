app.directive('autocompleteDropdown', [ '$timeout', function ($timeout) {
	return {
		restrict: 'E',
		require: '^ngModel',
		scope: {
			ngModel: '=',
			options: '=',
			placeholder: '@',
			label: '@',
			errorMessage: '=',
			getOptions: '&'
		},
		templateUrl: 'app/directives/autocomplete-dropdown.html',
		link: function (scope, element) {
			scope.settings = {
				filteredOptions: [],
				optionIndex: -1
			};

			scope.selectOption = function (team) {
				scope.ngModel = team;
				scope.settings.filteredOptions.length = 0;
				scope.errorMessage = null;
			};

			scope.blurInput = function () {
				$timeout(function () {
					scope.settings.filteredOptions.length = 0;
				}, 200);
			};

			scope.getList = function() {
				if (scope.options) {
					angular.extend(scope.settings.filteredOptions, scope.options);
				}
				else {
					angular.extend(scope.settings.filteredOptions, scope.getOptions());
				}
			};

			scope.getCompleteList = function ($event) {
				$event.preventDefault();
				element.find('input')[0].focus();
				if (!scope.ngModel) {
					scope.getList();
				}
				else {
					scope.showOptions();
				}
			};

			// list dropdown
			scope.showOptions = function () {
				scope.settings.filteredOptions.length = 0;
				if (!scope.options || !scope.ngModel) { return; }
				scope.settings.filteredOptions = scope.options.filter(function (option) {
					return option.toLowerCase().indexOf(scope.ngModel.toLowerCase()) === 0;
				});
			};

		}
	}
}]);