/* The presenter */

(function() { 'use strict';
  var list = new List();

  // HTML for a single list item
  var template = $("[type='html/list']").html();
  var root = $("#list");

  /* listen to user events */

  $('#add_item').click(function() {
    var str = $.trim($('#new_item').val());
    list.add(str);
    $('#new_item').val('');
  });

  $("#new_item").keyup(function(e) {
    var str = $.trim(this.value);
    if (e.which == 13 && str) {
      list.add(str);
      this.value = "";
    }
  });

  /* Listen to model events */

  list.on("add", add);

  /* Private functions */

  function add(item) {
    $($.render(template, item)).appendTo(root);
  }
})()
