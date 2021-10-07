$(document).ready(function () {
  $('#dtBasicExample').DataTable({
  "searching": false, // false to disable search

  "aaSorting": [],
  columnDefs: [{
  orderable: false,
  targets: [4, 5]
  }]

  });

  $('.dataTables_length').addClass('bs-select');
  });