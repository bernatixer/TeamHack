var counter = 1;

$( function() {
  $("#notelist").sortable({ revert: true });
});

$(document).ready(function(){
  $("#add").click(function(){
    var number = Math.round(Math.random() * (10 - 1)) + 1;
    var chunk = '<li id="note'+counter+'"><div class="objN note'+number+' draggable ui-widget-content"><input class="title form-control" type="text" maxlength="18"/><textarea class="text form-control"/></textarea><div class="d-flex justify-content-between"><p></p><i class="fa fa-arrows" aria-hidden="true"></i><button class="fa fa-trash-o" aria-hidden="true" onclick="removeNote(\'note'+counter+'\')"></button></div></div></li>'
    $("#notelist").append(chunk);
    counter++;
  });
});

function removeNote(id) {
  if (confirm("Are you sure?")) {
        $('#' + id).remove();
    }
    return false;
}
