'use strict';

Advertisements.factory('mainData', function ($http, baseServiceUrl) {
    var data = {};

    data.params = {};

    data.getAllAdds = function (success, error) {
        $http.get(baseServiceUrl + '/ads', {params: this.params})
            .success(function (data) {
                success(data)
            }).error(error);
    };

    data.getAllTowns = function (success, error) {
        $http.get(baseServiceUrl + '/towns')
            .success(function (data) {
                success(data)
            }).error(error);
    };

    data.getAllCategories = function (success, error) {
        $http.get(baseServiceUrl + '/categories')
            .success(function (data) {
                success(data)
            }).error(error);
    };

    data.clearParams = function () {
        data.params.categoryId = null;
        data.params.townId = null;
        data.params.startPage = 1;
    };

    data.clearParams();
    data.params.pageSize = 5;

    return data;
});