SocialNetwork.factory('authenticationService', function ($http, baseUrl) {
    var service = {};

    var serviceUrl = baseUrl + '/users';

    service.Login = function (loginData, success, error) {
        $http.post(serviceUrl + '/login', loginData)
            .success(function (data) {
                success(data);
            }).error(error);
    };

    service.Register = function (registerData, success, error) {
        $http.post(serviceUrl + '/register', registerData)
            .success(function (data) {
                success(data);
            }).error(error);
    };

    service.GetUserProfileData = function (success, error) {
        $http.get(baseUrl + '/me', {headers: this.GetHeaders()})
            .success(function (data) {
                success(data)
            }).error(error);
    };

    service.EditUserProfile = function (editUserData, success, error) {
        $http.put(baseUrl + '/me', editUserData, {headers: this.GetHeaders()})
            .success(function (data) {
                success(data)
            }).error(error);
    };

    service.ChangePassword = function (passwordData, success, error) {
        $http.put(baseUrl + '/me/ChangePassword', passwordData, {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                success()
            }).error(error);
    };

    service.GetProfileDataForSpecificUser = function (username, success, error) {
        $http.get(serviceUrl + '/' + username,
            {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.SetCredentials = function (serverData) {
        sessionStorage['accessToken'] = serverData.access_token;
        sessionStorage['username'] = serverData.userName;
    };

    service.setProfilePicture = function (profilePicture) {
        sessionStorage['profilePicture'] = profilePicture;
    };

    service.GetUsername = function () {
        return sessionStorage['username'];
    };

    service.ClearCredentials = function () {
        sessionStorage.clear();
    };

    service.GetHeaders = function () {
        return {
            Authorization: "Bearer " + sessionStorage['accessToken']
        };
    };

    service.isLoggedIn = function () {
        return sessionStorage['accessToken'];
    };

    return service;
});