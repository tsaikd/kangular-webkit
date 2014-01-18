kangular-webkit
============

tsaikd angular lib for some webkit feature

## Usage
```
angular.module("app", ["kangular-webkit"])

.controller("MainCtrl", ["$scope", "webkitNotify", function($scope, webkitNotify) {
	$scope.onBtnClick = function() {
		// request permission
		webkitNotify();
	};
	$scope.onMessage = function() {
		webkitNotify("Some message");
	};
}]);
```

## Full config
see [source code](src/webkitNotify.js)

