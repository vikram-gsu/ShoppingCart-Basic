(function(){
	'use strict;'

	var listItemComponentOptions = {
					templateUrl: 'listItem.html',
					controller: ShoppingCartListItemComponentController,
					bindings:{
						items: "<",
						myTitle: "@title",
						onRemove: "&removeItem"
					}
				}
	var spinnerAppComponentOptions = {
		templateUrl: 'loadingImage.html',
		controller: SpinnerController
	}
	angular.module('ShoppingCartApp', [])
				.controller('ShoppingCartListController', ShoppingCartListController)
				.component('listItem', listItemComponentOptions)
				.component('spinnerApp', spinnerAppComponentOptions)
				// .service('ShoppingCartService', ShoppingCartService)
				.service('WeightLossFilterService', WeightLossFilterService)


	SpinnerController.$inject = ['$rootScope']
	function SpinnerController($rootScope){
		var $ctrl = this
		var cancelListener = $rootScope.$on('spinner:checkName', function(event, data){
			$ctrl.spinnerIsOn = data.isOn
		})

		$ctrl.$onDestroy = function(){
			cancelListener()
		}
	}
	ShoppingCartListItemComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService']
	function ShoppingCartListItemComponentController($rootScope, $element, $q, WeightLossFilterService){
		var $ctrl = this
		var totalItems
		$ctrl.cookiesInList = function(){
			for (var i = $ctrl.items.length - 1; i >= 0; i--) {
				if($ctrl.items[i].itemName.indexOf('cookie') != -1){
					return true
				}else{
					return false
				}
			}
		}

		$ctrl.$onInit = function(){
			totalItems = 0
		}

		$ctrl.$onChanges = function(changeObj){
			console.log('Changes:', changeObj)
		}

		$ctrl.$doCheck = function(){
			if($ctrl.items.length != totalItems){
				totalItems = $ctrl.items.length
				var promises = []
				for (var i = $ctrl.items.length - 1; i >= 0; i--) {
					promises.push(WeightLossFilterService.checkChips($ctrl.items[i].itemName))
				}
				$rootScope.$broadcast('spinner:checkName', {isOn: true})
				$q.all(promises)
				.then(response => {
					var element = $element.find('div.warning')
					// $ctrl.warningMessage = response.message
					element.slideUp(900)

				})
				.catch(error => {
					var element = $element.find('div.warning')
					// $ctrl.warningMessage = error.message
					element.slideDown(900)
				})
				.finally(r => {
					$rootScope.$broadcast('spinner:checkName', {isOn: false})	
				})
				
			}
		}

	}

	function ShoppingCartListController(){
		var list = this
		list.items = []
		list.lastRemoved = ''
		list.addItem = function(){
			list.items.push({itemName: list.itemName, itemQuantity: list.itemQuantity})
			list.title = `Shopping Cart(${list.items.length} items)`
		}

		list.removeItem = function(index){
			list.lastRemoved = list.items.splice(index,1)[0].itemName
			list.title = `Shopping Cart(${list.items.length} items)`
		}
	}

	// ShoppingCartService.$inject = ['$q', '$timeout', 'weightLossFilterService']
	// function ShoppingCartService(){
	// 	var service = this


	// }

	WeightLossFilterService.$inject = ['$q', '$timeout']
	function WeightLossFilterService($q, $timeout){
		var service = this

		service.checkChips = function(name){
			var deferred = $q.defer()
			var result = { message: ''}	
			$timeout(() => {
				if(name.indexOf('chip') != -1){
					result.message = 'No more chips available' 
					deferred.reject(result)
				}else{
					deferred.resolve(result)
				}
			},1000)

			return deferred.promise
		}
	}
})();