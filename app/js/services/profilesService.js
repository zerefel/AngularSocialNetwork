SocialNetwork.factory('profilesService', function ($http, baseUrl, authenticationService) {
    var service = {};

    var serviceUrl = baseUrl;

    service.getUsersByName = function (searchName, success, error) {
        $http.get(serviceUrl + '/users/search?searchTerm=' + searchName,
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.getFriendRequests = function (success, error) {
        $http.get(serviceUrl + '/me/requests',
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.sendFriendRequest = function (username, success, error) {
        $http.post(serviceUrl + '/me/requests/' + username, {},
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.acceptFriendRequest = function (id, success, error) {
        $http.put(serviceUrl + '/me/requests/' + id + '?status=approved', {},
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.rejectFriendRequest = function (id, success, error) {
        $http.put(serviceUrl + '/me/requests/' + id + '?status=delete', {},
            {headers: tauthenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.getOwnFriendsPreview = function (success, error) {
        $http.get(serviceUrl + '/me/friends/preview', {
            headers: authenticationService.GetHeaders()
        })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.getOwnFriendsDetails = function (success, error) {
        $http.get(serviceUrl + '/me/friends',
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.getUserFriendsPreview = function (user, success, error) {
        $http.get(serviceUrl + '/users/' + user + '/friends/preview',
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.getUserFriendsDetails = function (user, success, error) {
        $http.get(serviceUrl + '/users/' + user + '/friends',
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    return service;
});