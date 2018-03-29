var myApp = angular.module('myApp', []);

myApp.factory('data', function(){

	return [
		{
			title:'no1',
			content:'content-1',
		},
		{	
			title:'no2',
			content:'content-2',			
		},
		{
			title:'no3',
			content:'content-3',
		}
	]

});

myApp.controller('firstController', ['$scope', 'data', function($scope, data){

	$scope.data = data;
}]);

myApp.directive('accordionGroup', function(){
	return {

		restrict:'E',
		replace:true,
		template: '<div class="panel-groupe" ng-transclude></div>',
		transclude: true,
		controller: function(){
			this.group = [];
			this.colseOtherCollapse = function(nowScope){
				angular.forEach(this.group, function(scope){
					if(scope !== nowScope){
							scope.isClosed = true;
					}
				});

			}
		},
		controllerAs: 'accordionGroupeCtrl',
	}
});

myApp.directive('accordionCollapse', function(){

	return{

		restrict: 'E',
		replace: true,
		require: '^accordionGroup',
		templateUrl: 'tpls/collapse.html',
		
		scope: {
			heading :'@',

		},
		transclude: true,
		link: function(scope, element, attrs, accordionGroupeCtrl){

				scope.isClosed=true;
				accordionGroupeCtrl.group.push(scope);

				scope.changeStatut= function(){
					scope.isClosed=!scope.isClosed;
					accordionGroupeCtrl.colseOtherCollapse(scope);
				}

		}

	}
});