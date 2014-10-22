var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    },
    onSuccess: function (position) {

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        app.markOnMap(latitude, longitude);

        $(function(){
            $('#lat').val(latitude);
            $('#lng').val(longitude);
        });

    },
    onError: function (error) {
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    },
    markOnMap: function(lat, long) {
        var place = {
            lat:lat,
            lng:long
        };
        mapa.addMarker(place);
    }
};
