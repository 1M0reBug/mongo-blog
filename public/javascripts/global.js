var App = angular.module('App', []);

(function(){

	'use strict';

	App.controller("showArticles", ['$scope', '$http', function($scope, $http){

		$scope.getArticles = function() {
			$http.get( '/articles/articles' )
				.then(function(response){
					$scope.articles = response.data;
				});
		};

		$scope.getArticles();

	}]);


	App.controller("addArticle", ['$scope', '$http', function($scope, $http){

		$scope.article = {
			title : "",
			author : "",
			body : ""
		};

		$scope.sendArticle = function(){
			var art = $scope.article;
			if(art.body !== "" && art.author !== "" && art.title !== ""){
				$http.post('/articles/new', $scope.article)
					.success(function(response){
						window.location = 'http://localhost:3000/'; 
					})
					.error(function(response, status){
						$scope.error = {message : response.msg};
					});
			}
			else{
				$scope.error = {message : "All fields are not full !"};
			}
		};
	}]);
})();