$(document).on('ready',function(){
	
	function popUp(feature, layer) {
		layer.bindPopup(feature.properties.mag);
	}	
	
	var layerMap = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
		key: "6798e89110614f5a9da04c5cd2918bf1",    
	    maxZoom: 20
	});

	var geojsonLayer = new L.GeoJSON.AJAX("http://www.corsproxy.com/earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",{onEachFeature:popUp});

	var map = L.map('map').setView([51.505, -0.09], 13);

	layerMap.addTo(map);
  	geojsonLayer.addTo(map);

});