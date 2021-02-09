/* global data */
/* exported data */

// Event listener for image url
var $urlImage = document.querySelector('.url-image');
var $url = document.querySelector('#entry-form-photo-url');

function updateEntryImage(event) {
  var urlInputValue = event.target.value;
  $urlImage.setAttribute('src', urlInputValue);
}

$url.addEventListener('input', updateEntryImage);

// Event listener for submit event
var $newEntryForm = document.querySelector('.new-entry-form');

function saveNewEntry(event) {
  event.preventDefault();
  var entryInputs = {};
  entryInputs.title = $newEntryForm.elements.title.value;
  entryInputs.photo = $newEntryForm.elements.photo.value;
  entryInputs.note = $newEntryForm.elements.note.value;
  entryInputs.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(entryInputs);
}

$newEntryForm.addEventListener('submit', saveNewEntry);
