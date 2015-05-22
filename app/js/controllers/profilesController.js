SocialNetwork.controller('ProfilesController', function ($scope, $rootScope, profilesService, $localStorage, $location, notificationService, authenticationService, $route, $routeParams) {

    $scope.setCurrentUser = function () {
        $scope.currentUser = $routeParams.id;
    };

    $scope.getUserData = function () {
        authenticationService.GetUserProfileData(function (serverData) {
            $scope.userData = serverData;
            $('#gender' + serverData.gender).parent().addClass('active');
        }, function () {
            notificationService.showError("Error fetching data about your profile.")
        });
    };

    $scope.editProfile = function () {
        authenticationService.EditUserProfile($scope.userData, function (serverData) {
            authenticationService.GetUserProfileData(function (successData) {
                notificationService.showInfo("Successfully edited profile!");
                $rootScope.userProfileData = successData;
                $localStorage.userProfileData = successData;
                $location.path('/user/home');
            }, function (error) {
                notificationService.showError("Error editing profile.");
            });
        }, function (errorMessage) {
            notificationService.showError("Error editing profile. " + errorMessage.message);
        });
    };

    $scope.searchUserByName = function () {
        if ($scope.searchUserName) {
            profilesService.getUsersByName($scope.searchUserName, function (serverData) {
                $rootScope.searchResults = serverData;
            }, function (error) {
                notificationService.showError("Error loading users. " + error.message)
            });
        }
    };

    $scope.setCurrentName = function () {
        authenticationService.GetUserProfileData($routeParams.username, function (serverData) {
            $scope.currentName = serverData.name;
        }, function (error) {

        });
    };

    $scope.isWallOwnerFriend = function () {
        authenticationService.getUserFullData($route.id, function (serverData) {
            return serverData.isFriend;
        }, function (error) {
            return false;
        });
    };

    $scope.getFriendRequests = function () {
        profilesService.getFriendRequests(function (serverData) {
            $scope.friendRequests = serverData;
        }, function (error) {
            notificationService.showError("Error loading friend requests." + error.message);
        });
    };

    $scope.acceptFriendRequest = function (id) {
        profilesService.acceptFriendRequest(id, function (successData) {
            notificationService('Friend request accepted!');
        }, function (error) {
            notificationService.showError('Error accepting friend request.' + error.message);
        });
    };

    $scope.rejectFriendRequest = function (id) {
        profilesService.rejectFriendRequest(id, function (successData) {
            notificationService('Friend request rejected!');
        }, function (error) {
            notificationService.showError('Error rejecting friend request.' + error.message);
        });
    };

    $scope.getOwnFriendsPreview = function () {
        profilesService.getOwnFriendsPreview(function (serverData) {
            $scope.ownFriendsPreview = serverData;
        }, function (error) {
            // poppy.pop('error', 'Error', 'There was an error getting the friends preview');
        });
    };

    $scope.getWallOwnerFriendsPreview = function () {
        if ($routeParams.id === localStorage['username']) {
            $scope.getOwnFriendsPreview();
            return;
        }
        profilesService.getUserFriendsPreview($routeParams.id, function (serverData) {
            $scope.ownFriendsPreview = serverData;
        }, function (error) {
           notificationService.showError("Error getting friends preview. " + error.message);
        });
    };

    $scope.getWallOwnerFriendsDetails = function () {
        if ($routeParams.username == sessionStorage['username']) {
            $scope.getFriendsDetails();
            return;
        }
        this.getUserFriendsDetails($routeParams.username, function (serverData) {
            $scope.friendsDetails = serverData;
        }, function (error) {
            notificationService.showError('Error getting friends details. ' + error.messsage);
        });
    };

    $scope.getFriendsDetails = function () {
        profilesService.getOwnFriendsDetails(function (serverData) {
            $scope.friendsDetails = serverData;
        }, function (error) {
            notificationService.showError('Error getting friends details. ' + error.messsage);
        });
    };
});