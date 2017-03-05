
$('#create').click(function (e) {
  // e.preventDefault();
  var sugID = $('#basic-url').val();
  getNewRef(sugID, function (created, tab) {
    if (created) {
      var tabId = tab.key;
      console.log('#1');
      newTab(tab);
      console.log('#2');
      $("#tabs_dropdown").append('<a class="dropdown-item" href="#" onclick="switchTab(\'' + tabId + '\')">' + tabId + '</a>');
      $('.modal').modal('toggle');
    }
  });
});
