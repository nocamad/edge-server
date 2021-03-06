(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Disaster', Disaster);

    Disaster.$inject = ['$resource'];

    function Disaster ($resource) {
        var resourceUrl =  'disasterservice/api/disasters/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'save': { method:'POST' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'}
        });
    }
})();
