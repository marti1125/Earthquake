Zepto(function($){

    function geoData(data){
        var geojsonLayer = new L.GeoJSON.AJAX("http://www.corsproxy.com/earthquake.usgs.gov/earthquakes/feed/v1.0/summary/"+data+".geojson",{onEachFeature:popUp}).addTo(map);
        return geojsonLayer;
    }

    var map = L.map('map').setView([51.505, -0.09], 13);

    function popUp(f,l){
        var out = [];
        if (f.properties){
            for(key in f.properties){
                out.push(key+": "+f.properties[key]);
            }
            l.bindPopup(out.join("<br />"));
        }
    }

    var geojsonLayer = geoData("all_hour");

    var layerMap = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
        key: "6798e89110614f5a9da04c5cd2918bf1",
        maxZoom: 20
    });

    geojsonLayer.addTo(map);
    layerMap.addTo(map);

    $("#btn-allEart-PastHour").on('click', function(){
        geoData("all_hour");
    });

    $("#btn-M45-PastHour").on('click', function(){
        geoData("4.5_week");
    });

});