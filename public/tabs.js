
$('#create').click(function (e) {
  var sugID = $('#basic-url').val();
  getNewRef(sugID, function (created, tab) {
    if (created) {
      var tabId = tab.key;
      newTab(tab);
      $("#tabs_dropdown").append('<a class="dropdown-item" href="#" onclick="switchTab(\"' + tabId + '\")">' + tabId + '</a>');
    }
  });
});
