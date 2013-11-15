Zepto(function($){
 
    $('#aboutApp').hide();  

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    var map = L.map('map').setView([23.21980912722173,-31.9921875], 1);    

    function popUp(f,l){
        var out = [];
        if (f.properties){
            for(key in f.properties){
                if(key == "mag" || key =="title"){
                    out.push("<div id="+key+">"+key.capitalize()+": "+f.properties[key]+"</div>");
                }

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
        $('#map').removeClass('hideMap');
        $('#aboutApp').hide();  
       
        map.remove();
        map = L.map('map').setView([23.21980912722173,-31.9921875], 1);        

        var geojsonLayer = geoData(data);

        var layerMap = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
            key: "6798e89110614f5a9da04c5cd2918bf1",
            maxZoom: 20
        });

        geojsonLayer.addTo(map);
        layerMap.addTo(map);
    }

    function btnEvents(btnName){
        $('#btn-' + btnName).click(function (){
            update($(this).data('geojson'));                           
        });
    }

    if(navigator.onLine){
        $('#message').html('');
        init();
    } else {
        $('#map').addClass('hideMap');
        $('#message').append('<h1 data-l10n-id="requiredInternet">Internet connection required<h1>');
    }

    //About App
    $("#btn-aboutApp").on('click', function(){
        $('#map').addClass('hideMap');
        $('#aboutApp').show();
    });

    var buttons = ['sigEart-PastHour', 'M45-PastHour', 'M25-PastHour', 'M10-PastHour','allEart-PastHour',
    'sigEart-PastDay','M45-PastDay','M25-PastDay','M10-PastDay','allEart-PastDay',
    'sigEart-Past7Days','M45-Past7Days','M25-Past7Days','M10-Past7Days','allEart-Past7Days',
    'sigEart-Past30Days','M45-Past30Days','M25-Past30Days','M10-Past30Days','allEart-Past30Days'];
    $.map(buttons, function(button){
        btnEvents(button);
    });    

});