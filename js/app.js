$(document).on('ready',function(){

	var map = L.map('map').setView([51.505, -0.09], 13);

	L.tileLayer('http://{s}.tile.cloudmade.com/a8fd3134fc184ea79fb57dd7630c1101/997/256/{z}/{x}/{y}.png', {    
	    maxZoom: 18
	}).addTo(map);

});

