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

	var geojsonLayer = new L.GeoJSON.AJAX("http://www.corsproxy.com/earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",{onEachFeature:popUp}).addTo(map);

	var layerMap = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
		key: "6798e89110614f5a9da04c5cd2918bf1",    
	    maxZoom: 20
	});

	geojsonLayer.addTo(map);
	layerMap.addTo(map);  	

});