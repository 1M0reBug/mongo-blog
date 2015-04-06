var App = angular.module('App', []);

(function(){

	'use strict';

	App.controller("showArticles", ['$scope', '$http', function($scope, $http){

		$scope.getArticles = function() {
			console.log("$scope.getArtcles appelée ! ");
			$http.get( '/articles/articles' )
				.then(function(response){
					$scope.articles = response.data;
					console.log("data:");
					console.log(data);
				});
		};

		$scope.getArticles();

	}]);
})();