SocialNetwork.factory('postsService', function ($http, baseUrl, authenticationService) {
    var service = {};

    var serviceUrl = baseUrl;

    service.getNewsFeed = function (success, error) {
        $http.get(serviceUrl + '/me/feed?StartPostId=&PageSize=5',
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.getWallPosts = function (user, success, error) {
        $http.get(serviceUrl + '/users/' + user + '/wall?StartPostId=&PageSize=5',
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.newPost = function (user, content, success, error) {
        $http.post(serviceUrl + '/posts',
            {'postContent': content, 'username': user},
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.likePost = function (id, success, error) {
        $http.post(serviceUrl + '/Posts/' + id + '/likes', {},
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.unlikePost = function (id, success, error) {
        $http.delete(serviceUrl + '/Posts/' + id + '/likes',
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.likeComment = function (postId, commentId, success, error) {
        $http.post(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes', {},
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.unlikeComment = function (postId, commentId, success, error) {
        $http.delete(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes',
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.commentPost = function (postId, content, success, error) {
        $http.post(serviceUrl + '/posts/' + postId + '/comments',
            {'commentContent': content},
            {headers: authenticationService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    return service;
});