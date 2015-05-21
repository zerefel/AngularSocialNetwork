'use strict';

Advertisements.factory('adServices', function ($http, baseServiceUrl) {
    var adService = {};

    adService.params = {};

    var adServiceUrl = baseServiceUrl + "/user/ads";

    adService.GetUserAds = function (headers, success) {
        $http.get(adServiceUrl,
            {
                params: this.params,
                headers: headers
            })
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    adService.PublishAd = function (adData, headers, success, error) {
        $http.post(adServiceUrl, adData, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    adService.DeactivateAd = function (adId, headers, success, error) {
        $http.put(adServiceUrl + '/deactivate/' + adId, {}, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    adService.GetUserAdById = function (adId, headers, success) {
        $http.get(adServiceUrl + '/' + adId,
            {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    adService.EditAd = function (currentAd, headers, success, error) {
        $http.put(adServiceUrl + '/' + currentAd.id, currentAd, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    adService.DeleteAd = function (adId, headers, success, error) {
        $http.delete(adServiceUrl + '/' + adId, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    adService.RepublishAd = function (adId, headers, success, error) {
        $http.put(adServiceUrl + '/publishagain/' + adId, {}, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    adService.clearParams = function () {
        adService.params.status = null;
        adService.params.startPage = 1;
    };

    adService.clearParams();
    adService.params.pageSize = 5;

    return adService;
});