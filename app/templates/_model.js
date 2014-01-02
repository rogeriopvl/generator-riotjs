/* The model */

function List(db) {

  db = db || DB('generator-riotjs');

  var self = $.observable(this);
  var items = db.get();

  self.add = function(str) {
    var item = { id: "_" + ("" + Math.random()).slice(2), desc: str };
    items[item.id] = item;
    self.trigger("add", item);
  }

  // sync database
  self.on("add", function() {
    db.put(items);
  })

}
