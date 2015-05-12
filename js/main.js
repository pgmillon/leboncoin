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

      $('#lbc-pager').html(Mustache.render(pagerTemplate, {
        count: data.houses?data.houses.length:0,
        total: data.count?data.count:0
      }));

      if(35 < data.count) {
        if(data.houses && data.houses.length + ((page - 1) * 35) < data.count) {
          $('#lbc-pager .next').show();
        }
      }

      if(1 < page) {
        $('#lbc-pager .previous').show();
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
    var page = parseInt($('#lbc-pager').data('page'), 10) + 1;

    $('#lbc-pager').data('page', page);

    fetch(city, page);
  });


  $(document).on('click', '#lbc-pager .previous', function() {
    var city = $('#lbc-pager').data('city');
    var page = parseInt($('#lbc-pager').data('page'), 10) - 1;

    $('#lbc-pager').data('page', page);

    fetch(city, page);
  });

  $('.lbc-menu .lbc-city').click(function() {
    $('.lbc-menu .lbc-city').removeClass('active');
    $(document).scrollTop(0);
    var city = $(this).data('city');
    console.debug(city);

    $(this).addClass('active');
    $('#lbc-pager').data('page', 1);
    $('#lbc-pager').data('city', city);

    fetch(city, 1);
  })
});
