/* Code taken from https://github.com/moot/riotjs/blob/master/todomvc */

function DB(key) {
  var store = window.localStorage;

  return {
    get: function() {
      return JSON.parse(store[key] || '{}')
    },

    put: function(data) {
      store[key] = JSON.stringify(data)
    }
  }
}
