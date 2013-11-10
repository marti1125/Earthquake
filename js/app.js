Zepto(function($){

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

    $('#aboutApp').hide();

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

    //Past Hour
    $("#btn-sigEart-PastHour").on('click', function(){
        update("significant_hour");
    });

    $("#btn-M45-PastHour").on('click', function(){
        update("4.5_hour");
    });

    $("#btn-M25-PastHour").on('click', function(){
        update("4.5_hour");
    });

    $("#btn-M10-PastHour").on('click', function(){
        update("1.0_hour");
    });

    $("#btn-allEart-PastHour").on('click', function(){
        update("all_hour");
    });

    //Past Day
    $("#btn-sigEart-PastDay").on('click', function(){
        update("significant_day");
    });

    $("#btn-M45-PastDay").on('click', function(){
        update("4.5_day");
    });

    $("#btn-M25-PastDay").on('click', function(){
        update("4.5_day");
    });

    $("#btn-M10-PastDay").on('click', function(){
        update("1.0_day");
    });

    $("#btn-allEart-PastDay").on('click', function(){
        update("all_day");
    });

    //Past 7 Days
    $("#btn-sigEart-Past7Days").on('click', function(){
        update("significant_week");
    });

    $("#btn-M45-Past7Days").on('click', function(){
        update("4.5_week");
    });

    $("#btn-M25-Past7Days").on('click', function(){
        update("4.5_week");
    });

    $("#btn-M10-Past7Days").on('click', function(){
        update("1.0_week");
    });

    $("#btn-allEart-Past7Days").on('click', function(){
        update("all_week");
    });

    //Past 30 Days
    $("#btn-sigEart-Past30Days").on('click', function(){
        update("significant_month");
    });

    $("#btn-M45-Past30Days").on('click', function(){
        update("4.5_month");
    });

    $("#btn-M25-Past30Days").on('click', function(){
        update("4.5_month");
    });

    $("#btn-M10-Past30Days").on('click', function(){
        update("1.0_month");
    });

    $("#btn-allEart-Past30Days").on('click', function(){
        update("all_month");
    });

});