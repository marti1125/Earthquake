Zepto(function($){

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

    function geoData(data){
        var geojsonLayer = new L.GeoJSON.AJAX("http://www.corsproxy.com/earthquake.usgs.gov/earthquakes/feed/v1.0/summary/"+data+".geojson",{onEachFeature:popUp});
        return geojsonLayer;
    }
	
	function init(){
        var geojsonLayer = geoData("all_hour");

        var layerMap = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
            key: "6798e89110614f5a9da04c5cd2918bf1",
            maxZoom: 20
        });

        geojsonLayer.addTo(map);
        layerMap.addTo(map);
	}

    function update(data){
        var geojsonLayer = geoData(data);

        var layerMap = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
            key: "6798e89110614f5a9da04c5cd2918bf1",
            maxZoom: 20
        });

        geojsonLayer.addTo(map);
        layerMap.addTo(map);
    }

	init();

    $("#btn-sigEart-PastHour").on('click', function(){
        map.remove();
        map = L.map('map').setView([51.505, -0.09], 13);
        update("significant_hour");
    });

    $("#btn-M45-PastHour").on('click', function(){
        map.remove();
        map = L.map('map').setView([51.505, -0.09], 13);
        update("4.5_hour");
    });

    $("#btn-M25-PastHour").on('click', function(){
        map.remove();
        map = L.map('map').setView([51.505, -0.09], 13);
        update("4.5_hour");
        geoData("2.5_hour");
    });

    $("#btn-M10-PastHour").on('click', function(){
        map.remove();
        map = L.map('map').setView([51.505, -0.09], 13);
        update("1.0_hour");
    });

    $("#btn-allEart-PastHour").on('click', function(){
        map.remove();
        map = L.map('map').setView([51.505, -0.09], 13);
        update("all_hour");
    });

});