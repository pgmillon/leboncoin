jQuery(document).ready(function($) {
  var houseTemplate = $('#houseTemplate').html();
  var pagerTemplate = $('#pagerTemplate').html();

  function fetch(city, page) {
    $.getJSON('/api', {
      'location': city
    }, function(data) {
      console.debug(data);

      $('#lbc-pager').html(Mustache.render(pagerTemplate, {count: data.houses.length}));
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
      }
    });
  }

  Mustache.parse(houseTemplate);
  Mustache.parse(pagerTemplate);

  $(document).ajaxStart(function() {
    $('#ajax-loader').show();
    $('#lbc-pager').html('Chargement en cours...');
  });

  $(document).ajaxComplete(function() {
    $('#ajax-loader').hide();
  });

  $('.lbc-menu .lbc-city').click(function() {
    var city = $(this).data('city');
    console.debug(city);

    $('#lbc-content').empty();
    $('#lbc-pager').data('page', 1);

    fetch(city, 1);
  })
});
