/* global data */
/* exported data */

var $urlImage = document.querySelector('.url-image');
var $url = document.querySelector('#entry-form-photo-url');

function updateEntryImage(event) {
  var urlInputValue = event.target.value;
  $urlImage.setAttribute('src', urlInputValue);
}

$url.addEventListener('input', updateEntryImage);

var $newEntryForm = document.querySelector('.new-entry-form');

function saveNewEntry(event) {
  event.preventDefault();
  var entryInputs = {};
  entryInputs.title = $newEntryForm.elements.title.value;
  entryInputs.photo = $newEntryForm.elements.photo.value;
  entryInputs.note = $newEntryForm.elements.note.value;
  entryInputs.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(entryInputs);
  $newEntryForm.reset();
  $urlImage.setAttribute('src', 'images/placeholder-image-square.jpg');
}

$newEntryForm.addEventListener('submit', saveNewEntry);
