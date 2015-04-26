var App = angular.module('App', []);

(function(){

	'use strict';

	App.config(['$locationProvider', function($locationProvider){
		$locationProvider.html5Mode({enabled:true, requireBase : false});
	}]);

	App.controller("showArticles", ['$scope', '$http','$location',
		function($scope, $http,$location){
			$scope.getArticles = function(){
				$scope.numberOfPages = 0;
				$http.get('/articles/count')
					.then(function(response){
						var tenth = Math.ceil(response.data / 10);
						$scope.pagination = {
							numberOfPages: new Array(tenth),
							currentPage: $location.search().page || 1
						};
						var _this = $scope.pagination;
						$scope.pagination.currentIsFirst = _this.currentPage <= 1;

						$scope.pagination.currentIsLast =  _this.currentPage >= _this.numberOfPages.length;

						var numberOfPages = _this.numberOfPages.length;
						var page = _this.currentPage;
						page = page > numberOfPages?numberOfPages:page;
						page = page <=1?1:page;
						var url = page > 1 ? '/articles/articles?page='+page:'/articles/articles';
						$http.get( url )
							.then(function(response){
								$scope.articles = response.data;
							});
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
						window.location.replace('/'); 
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