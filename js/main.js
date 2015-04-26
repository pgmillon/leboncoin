jQuery(document).ready(function($) {
  var houseTemplate = $('#houseTemplate').html();
  Mustache.parse(houseTemplate);
  console.debug(houseTemplate);

  $(document).ajaxStart(function() {
    $('#ajax-loader').show();
  });

  $(document).ajaxComplete(function() {
    $('#ajax-loader').hide();
  });

  $('.lbc-menu .lbc-city').click(function() {
    var city = $(this).text();
    console.debug(city);

    $('#lbc-content').empty();

    $.getJSON('/api', {
      'location': city
    }, function(data) {
      console.debug(data);

      if(data.houses && data.houses.length > 0) {
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
      } else {
        $('#lbc-content').append("Aucune annonce");
      }
    });

  })
});
