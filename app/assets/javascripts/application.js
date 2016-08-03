// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
$(document).ready(function(){

var bloodhound = new Bloodhound({
  datumTokenizer: function (d) {
    return Bloodhound.tokenizers.whitespace(d.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,

  // sends ajax request to /typeahead/%QUERY
  // where %QUERY is user input
  remote: {
      url: "/typeahead/%QUERY",
      wildcard: "%QUERY"
    },
  limit: 50
});
bloodhound.initialize();


$('.typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1,
},
{
  displayKey: 'name',
  source: bloodhound.ttAdapter()
});

$('.typeahead').bind('typeahead:selected', function(event, datum, name) {
  console.log(datum.location_id);
  $.post('/set_user_city',{city_id:datum.location_id, city:datum.name});
});

$('.btn-pluss').on('click', function(){
  $('#restaurant_2').removeClass('hidden');
  $('.btn-pluss').addClass('hidden');
  });

$('.btn-pluss_1').on('click', function(){
  $('.btn-pluss_1').addClass('hidden');
  $('#restaurant_3').removeClass('hidden');
  });
})
