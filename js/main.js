function initGmaps() {
  //var coord = new google.maps.LatLng(50.6691505,2.8403389);
  //var mapOptions = {
  //  mapTypeId: google.maps.MapTypeId.ROADMAP,
  //  center: coord,
  //  zoom: 9
  //}
  //
  //var map = new google.maps.Map(document.getElementById('leboncoin'), mapOptions);

  //var marker = new google.maps.Marker({
  //  position: coord,
  //  map: map,
  //  title: 'LeBonCoin'
  //});

}

function initMenu($) {
  var houseTemplate = $('#houseTemplate').html();
  Mustache.parse(houseTemplate);
  console.debug(houseTemplate);

  $('.lbc-menu .lbc-city').click(function() {
    var city = $(this).text();
    console.debug(city);

    $('#lbc-content').empty();

    $.getJSON('/api', {
      'location': city
    }, function(data) {
      console.debug(data);
      $.each(data.houses, function(index, house) {
        var houseElem = $(Mustache.render(houseTemplate, house));
        $('#lbc-content').append(houseElem);
        houseElem.find('.housePic').click(function(event) {
          blueimp.Gallery($(this).siblings().add(this),{
            index: this,
            event: event
          });
          return false;
        });
      });
    });

  })
}

jQuery(document).ready(function($) {
  //google.maps.event.addDomListener(window, 'load', initGmaps);
  initMenu($);
});
