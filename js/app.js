Zepto(function($){
 
    $('#aboutApp').hide();

    var map = L.mapbox.map('map', 'osgux.g96240ai');

    var markerLayer = L.mapbox.markerLayer()
        .loadURL('http://www.corsproxy.com/earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson')
        .addTo(map);

    function updateMarker(marker){
        $('#map').removeClass('hideMap');
        $('#aboutApp').hide();
        map.removeLayer(markerLayer);
        markerLayer = L.mapbox.markerLayer()
            .loadURL('http://www.corsproxy.com/earthquake.usgs.gov/earthquakes/feed/v1.0/summary/'+marker+'.geojson')
            .addTo(map);
    }

    function btnEvents(btnName){
        $('#btn-' + btnName).click(function (){
            if(navigator.onLine){
                updateMarker($(this).data('geojson'));
            } else {
                $('#aboutApp').hide();
                $('#message').show();
            }
        });
    }

    $("#btn-aboutApp").on('click', function(){
        $('#message').hide();
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

    if(navigator.onLine){
    } else {
        $('#map').addClass('hideMap');
        $('#message').append('<h1 data-l10n-id="requiredInternet">Internet connection required<h1>');
    }

});