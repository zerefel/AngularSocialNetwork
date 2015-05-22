SocialNetwork.controller('ProfilesController', function ($scope, $rootScope, profilesService, $location, notificationService, authenticationService, $route, $routeParams) {

    $scope.setCurrentUser = function () {
        $scope.currentUser = $routeParams.id;
    };

    $scope.getUserData = function() {
        authenticationService.GetUserProfileData(function(serverData) {
            $scope.userData = serverData;
            $('#gender' + serverData.gender).parent().addClass('active');
        }, function() {
           notificationService.showError("Error fetching data about your profile.")
        });
    };

    $scope.editProfile = function() {
        authenticationService.EditUserProfile($scope.userData, function (serverData) {
            $location('/user/home');
            notificationService.showInfo("Successfully edited profile!");
        }, function (errorMessage) {
            notificationService.showError("Error editing profile.");
        });
    };


    $scope.searchUserByName = function () {
        if($scope.searchUserName) {
            profilesService.getUsersByName($scope.searchUserName, function (serverData) {
                $rootScope.searchResults = serverData;
            }, function (error) {
                notificationService.showError("Error loading users.")
            });
        }
    };

    $scope.setCurrentName = function () {
        authenticationService.getUserFullData($routeParams.id, function (serverData) {
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
            notificationService.showError("Error loading friend requests.")
        });
    };

    $scope.submitPost = function () {
        var user = $routeParams.id;
        var content = $('#postTextArea').val();
        if (!content) {
            poppy.pop('error', 'Error', 'The post content cannot be empty');
            return;
        }

        profilesService.newPost(user, content, function (serverData) {
            $route.reload();
        }, function (error) {
            poppy.pop('error', 'Error', 'An error occured when trying to submit the post');
        });
    };

    $scope.acceptFriendRequest = function (id) {
        profilesService.acceptFriendRequest(id, function (successData) {
            $scope.navigateToPage('Request accepted successfully', '#/FriendRequests');
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error approving the request');
        });
    };

    $scope.rejectFriendRequest = function (id) {
        profilesService.rejectFriendRequest(id, function (successData) {
            $scope.navigateToPage('Request rejected successfully', '#/FriendRequests');
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error rejecting the request');
        });
    };

    $scope.getOwnFriendsPreview = function () {
        profilesService.getOwnFriendsPreview(function (serverData) {
            $scope.ownFriendsPreview = serverData;
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error getting the friends preview');
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
            poppy.pop('error', 'Error', 'There was an error getting the friends preview');
        });
    };

    $scope.getWallOwnerFriendsDetails = function () {
        if ($routeParams.id === localStorage['username']) {
            $scope.getFriendsDetails();
            return;
        }
        profilesService.getUserFriendsDetails($routeParams.id, function (serverData) {
            $scope.friendsDetails = serverData;
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error getting the friends details');
        });
    };

    $scope.getFriendsDetails = function () {
        profilesService.getOwnFriendsDetails(function (serverData) {
            $scope.friendsDetails = serverData;
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error getting the friends details');
        });
    };
});