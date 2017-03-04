$(".nav-tabs").on("click", "a", function (e) {
  e.preventDefault();

  if (!$(this).hasClass('add')) {
    $(this).tab('show');
    $('.active').removeClass('active');
  }
})
.on("click", "span", function () {
  var anchor = $(this).siblings('a');
  //$(anchor.attr('href')).remove();
  $(this).parent().remove();
  $(".nav-tabs li").children('a').first().click();
});

$('#create').click(function (e) {
  var id = $(".nav-tabs").children().length;
  var sugID = $('#basic-url').val();
  getNewRef(sugID, function (created, tab) {
    var tabId = tab.key;
    newTab(tab);
    $(this).closest('li').before('<li class="nav-item" id="' + tabId + '"><a href="#" class="nav-link active" data-toggle="tab">filename</a><span>x</span></li>');
    $('.nav-tabs li:nth-child(' + id + ') a').click();
  });
});
