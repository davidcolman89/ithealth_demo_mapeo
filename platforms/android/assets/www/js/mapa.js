var mapa = {};

mapa.mapOptions = {};

mapa.divMap = "";

mapa.map = {};

mapa.initializeMap = function(options,mapElement){
    mapa.mapOptions = options;
    mapa.divMap = mapElement;
    mapa.map = new google.maps.Map(mapa.divMap, mapa.mapOptions);
}

mapa.Dibujar = function (places, popUp) {
    var places = places || null;
    var n = 1;

    if (places != 0)
    {
        var place = new Array();
        var i;

        for (i in places)
        {
            var lat = parseFloat(places[i]['lat']);
            var lng = parseFloat(places[i]['lng']);
            place[i] = new google.maps.LatLng(lat, lng);
        }

        for (i in place)
        {
            var marker = mapa.marker(place[i], places[i]["notas"]);

            if (popUp)
            {
                mapa.addPopUP(marker, places[i]["contenidoPopUp"])
            }
        }
    }
};

mapa.addMarker = function (coordenadas) {
    var lng = parseFloat(coordenadas.lng);
    var lat = parseFloat(coordenadas.lat);
    var googleMapsLatLng = new google.maps.LatLng(lat, lng);

    mapa.marker(googleMapsLatLng);

    mapa.map.setZoom(10);
    mapa.map.setCenter(googleMapsLatLng);
};

mapa.marker = function (googleMapsLatLng, titulo, nota, icono) {
    return new google.maps.Marker({
        position: googleMapsLatLng,
        map: mapa.map,
        title: titulo || '',
        note: nota || null,
        icon: icono || null
    });
};

mapa.addPopUP = function (marker, contentString) {
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(mapa.map, marker);
    });
};