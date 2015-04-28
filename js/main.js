jQuery(document).ready(function($) {
  var houseTemplate = $('#houseTemplate').html();
  var pagerTemplate = $('#pagerTemplate').html();

  function fetch(city, page) {
    $('#lbc-content').empty();

    $.getJSON('/api', {
      'location': city,
      'page': page
    }, function(data) {
      console.debug(data);

      $('#lbc-pager').html(Mustache.render(pagerTemplate, {count: data.count?data.count:0}));

      if(35 < data.count) {
        $('#lbc-pager .next').show();
      }

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

  $(document).on('click', '#lbc-pager .next', function() {
    var city = $('#lbc-pager').data('city');
    var page = $('#lbc-pager').data('page');

    fetch(city, parseInt(page, 10) + 1);
  });

  $('.lbc-menu .lbc-city').click(function() {
    var city = $(this).data('city');
    console.debug(city);

    $('#lbc-pager').data('page', 1);
    $('#lbc-pager').data('city', city);

    fetch(city, 1);
  })
});
