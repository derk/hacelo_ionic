controllers.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, Nacion_Service) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.user = {
        "instagra_username": "Raiam"
    };
    $scope.validate = false;

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    $scope.insert_url = function() {
        if ($scope.validate == false) {
            $scope.validate = true;
            Nacion_Service.set_username($scope.user.instagra_username);
            $timeout(function() {
                $scope.closeLogin();
                Nacion_Service.createEvent('update-username', $scope.user.instagra_username);
            }, 1000);
        }

    };
    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
});