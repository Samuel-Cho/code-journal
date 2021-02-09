/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var $newEntryForm = document.querySelector('.new-entry-form');

function saveNewEntry(event) {
  event.preventDefault();
}

$newEntryForm.addEventListener('submit', saveNewEntry);
