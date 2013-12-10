Zepto(function($){

    if(!navigator.onLine){
        $('#map').addClass('hideMap'); 
        $('#message').append('<h1 data-l10n-id="requiredInternet">Internet connection required<h1>');
        $('#messageLastEarthqueaks').append('<h1 data-l10n-id="requiredInternet">Internet connection required<h1>');
    }

    var sched = later.parse.recur().every(4).minute(),
        t = later.setInterval(showEarthqueaks, sched);

    function showEarthqueaks(){       
      $('#listEarthqueaks').html('');
      if(navigator.onLine){           
        $.get('http://www.corsproxy.com/earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',function(data){
            $.each(data.features, function( index, value ) {
                $.each(value, function( index, result ) {
                    if(typeof result.title != 'undefined'){
                        $('#listEarthqueaks').append('<li>'+result.title+'</li>'); 
                    }   
                });
            });
            $('.preload').hide();
        }); 
      }                  
    }

    $.getJSON('http://glacial-gorge-2029.herokuapp.com/usgsted',function(data){ 
      $.each(data, function( index, value ) {
        $('#tweetsUsgsted').append('<li><div class="imgLeft"><img src="'+value.user.profile_image_url+'"/></div>' + 
          '<h1 class="titleTwitter">'+value.user.name+'<span class="usertwitter"> @'+value.user.screen_name+'</span></h1>' +
          '<p><strong>'+value.text+'</strong></p></li>');
      });
    });

    $.getJSON('http://glacial-gorge-2029.herokuapp.com/USGSBigQuakes',function(data){ 
      $.each(data, function( index, value ) {
        $('#tweetsUSGSBigQuakes').append('<li><div class="imgLeft"><img src="'+value.user.profile_image_url+'"/></div>' + 
          '<h1 class="titleTwitter">'+value.user.name+'<span class="usertwitter"> @'+value.user.screen_name+'</span></h1>' +
          '<p><strong>'+value.text+'</strong></p></li>');
      });
    });

    showEarthqueaks();
    $('#usgsted').hide();
    $('#usgsbigquakes').hide();
    $('#contentEarthqueaks').hide();
    $('#aboutApp').hide();

    var map = L.mapbox.map('map', 'osgux.g96240ai');    

    var markerLayer = L.mapbox.markerLayer()
        .loadURL('http://www.corsproxy.com/earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
        .addTo(map).on('ready',function(){
            markerLayer.eachLayer(function(marker){
                marker.setIcon(new L.Icon({
                    iconUrl:'./js/earthquake.png',
                    iconSize: [32, 37]
                }));
            });
        });

    function updateMarker(marker){
        $('#map').removeClass('hideMap');
        $('#aboutApp').hide();
        $('#contentEarthqueaks').hide();
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
        $('#contentEarthqueaks').hide();
        $('#aboutApp').show();
    });

    $("#btn-last-earthqueaks").on('click', function(){        
        $('#map').addClass('hideMap');
        $('#aboutApp').hide();
        $('#usgsbigquakes').hide();
        $('#usgsted').hide();  
        $('#contentEarthqueaks').show();        
        if(navigator.onLine){
            $('#messageLastEarthqueaks').hide();
        } else {
            $('.preload').hide();
            $('#messageLastEarthqueaks').show();
        }
    });

    $("#btn-usgsted").on('click', function(){        
        $('#map').addClass('hideMap');
        $('#aboutApp').hide();
        $('#contentEarthqueaks').hide();
        $('#usgsbigquakes').hide();
        $('#usgsted').show();        
    });

    $("#btn-usgsbigquakes").on('click', function(){        
        $('#map').addClass('hideMap');
        $('#aboutApp').hide();
        $('#contentEarthqueaks').hide();
        $('#usgsted').hide();  
        $('#usgsbigquakes').show();               
    });   

    var buttons = ['sigEart-PastHour', 'M45-PastHour', 'M25-PastHour', 'M10-PastHour','allEart-PastHour',
        'sigEart-PastDay','M45-PastDay','M25-PastDay','M10-PastDay','allEart-PastDay',
        'sigEart-Past7Days','M45-Past7Days','M25-Past7Days','M10-Past7Days','allEart-Past7Days',
        'sigEart-Past30Days','M45-Past30Days','M25-Past30Days','M10-Past30Days','allEart-Past30Days'];
    $.map(buttons, function(button){
         btnEvents(button);
    });     

});