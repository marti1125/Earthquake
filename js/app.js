var myScroll, myScroll2,
  pullDownEl, pullDownOffset;

function pullDownAction () {
  setTimeout(function () { 
     document.getElementById('scroller').style.transform = 'translate(0px, -63px) scale(1) translateZ(0px)';  
    myScroll.refresh();
  }, 1000);
}

function pullDownAction2 () {
  setTimeout(function () { 
     document.getElementById('scroller2').style.transform = 'translate(0px, -63px) scale(1) translateZ(0px)';  
    myScroll.refresh();
  }, 1000);
}

function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;

    pullDownEl2 = document.getElementById('pullDown2');
    pullDownOffset2 = pullDownEl2.offsetHeight;

    myScroll2 = new iScroll('wrapper2', {

      useTransition: true,
      topOffset: pullDownOffset2,
      onRefresh: function () {       
        if (pullDownEl2.className.match('loading')) {
          pullDownEl2.className = '';
          pullDownEl2.querySelector('.pullDownLabel2').innerHTML = 'Pull down to refresh...';
        }
      },
      onScrollMove: function () {
        //alert(this.y )
        if (this.y > 5 && !pullDownEl2.className.match('flip')) {
          pullDownEl2.className = 'flip';
          pullDownEl2.querySelector('.pullDownLabel2').innerHTML = 'Release to refresh...';
          this.minScrollY = 0;
        } else if (this.y < 5 && pullDownEl2.className.match('flip')) {
          pullDownEl2.className = '';
          pullDownEl2.querySelector('.pullDownLabel2').innerHTML = 'Pull down to refresh...';
          this.minScrollY = -pullDownOffset2;
        }
      },
      onScrollEnd: function () {
        if (pullDownEl2.className.match('flip')) {
          pullDownEl2.className = 'loading';
          pullDownEl2.querySelector('.pullDownLabel2').innerHTML = 'Loading...';        
          pullDownAction2(); // Execute custom function (ajax call?)
        }
      }

    });

    myScroll = new iScroll('wrapper', {

      useTransition: true,
      topOffset: pullDownOffset,
      onRefresh: function () {       
        if (pullDownEl.className.match('loading')) {
          pullDownEl.className = '';
          pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
        }
      },
      onScrollMove: function () {
        //alert(this.y )
        if (this.y > 5 && !pullDownEl.className.match('flip')) {
          pullDownEl.className = 'flip';
          pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
          this.minScrollY = 0;
        } else if (this.y < 5 && pullDownEl.className.match('flip')) {
          pullDownEl.className = '';
          pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
          this.minScrollY = -pullDownOffset;
        }
      },
      onScrollEnd: function () {
        if (pullDownEl.className.match('flip')) {
          pullDownEl.className = 'loading';
          pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';        
          pullDownAction(); // Execute custom function (ajax call?)
        }
      }

    });   

    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800); 
    document.getElementById('scroller').style.transform = 'translate(0px, -63px) scale(1) translateZ(0px)'; 

    setTimeout(function () { document.getElementById('wrapper2').style.left = '0'; }, 800); 
    document.getElementById('scroller2').style.transform = 'translate(0px, -63px) scale(1) translateZ(0px)';  
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);

Zepto(function($){

    function mostrarUrl(tweet) {
      var url_regexp = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
      return tweet.replace(url_regexp,"<a href='$1' class='tweetURL' target='_blank'>$1</a>");
    }

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

    if(navigator.onLine){      
      $('.preloadUsgsted').hide();
      $.getJSON('http://glacial-gorge-2029.herokuapp.com/usgsted',function(data){
        $.each(data, function( index, value ) {   

          $('#tweetsUsgsted').append('<li><div class="imgLeft"><img src="'+value.user.profile_image_url+'"/></div>' + 
            '<h1 class="titleTwitter">'+value.user.name+'<span class="usertwitter"> @'+value.user.screen_name+'</span></h1>' +
            '<p><strong>'+mostrarUrl(value.text)+'</strong></p></li>');
        });
      });        
    } else {
      $('.preloadUsgsted').hide();
    }
    
    if(navigator.onLine){     
      $('.preloadUsgsbigquakes').hide();
      $.getJSON('http://glacial-gorge-2029.herokuapp.com/USGSBigQuakes',function(data){ 
        $.each(data, function( index, value ) {
          $('#tweetsUSGSBigQuakes').append('<li><div class="imgLeft"><img src="'+value.user.profile_image_url+'"/></div>' + 
            '<h1 class="titleTwitter">'+value.user.name+'<span class="usertwitter"> @'+value.user.screen_name+'</span></h1>' +
            '<p><strong>'+mostrarUrl(value.text)+'</strong></p></li>');
        });
      });
    } else {
      $('.preloadUsgsbigquakes').hide();
    }

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
            .addTo(map).on('ready',function(){
            markerLayer.eachLayer(function(marker){
                marker.setIcon(new L.Icon({
                    iconUrl:'./js/earthquake.png',
                    iconSize: [32, 37]
                }));
            });
        });
    }

    function btnEvents(btnName){
        $('#btn-' + btnName).click(function (){
            if(navigator.onLine){
              $('#usgsbigquakes').hide();
              $('#usgsted').hide();
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
        $('#usgsbigquakes').hide();
        $('#usgsted').hide();
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