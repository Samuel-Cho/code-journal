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
  var entryInputs = {};
  entryInputs.title = $newEntryForm.elements.title.value;
  entryInputs.photo = $newEntryForm.elements.photo.value;
  entryInputs.note = $newEntryForm.elements.note.value;
}

$newEntryForm.addEventListener('submit', saveNewEntry);
