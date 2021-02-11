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
  var newEntryNode = createEntry(data.entries[0]);
  $ulEntries.prepend(newEntryNode);
  viewEntries();
}

$newEntryForm.addEventListener('submit', saveNewEntry);

var $ulEntries = document.querySelector('.entries-list');

function createEntry(entry) {
  var liJournalEntry = document.createElement('li');
  liJournalEntry.setAttribute('class', 'journal-entry');
  liJournalEntry.setAttribute('data-entry-id', entry.entryId);

  var divRow = document.createElement('div');
  divRow.setAttribute('class', 'row');
  liJournalEntry.appendChild(divRow);

  var divColumnHalf1 = document.createElement('div');
  divColumnHalf1.setAttribute('class', 'column-half');
  divRow.appendChild(divColumnHalf1);

  var divEntryImageContainer = document.createElement('div');
  divEntryImageContainer.setAttribute('class', 'entry-image-container');
  divColumnHalf1.appendChild(divEntryImageContainer);

  var imgEntryImage = document.createElement('img');
  imgEntryImage.setAttribute('class', 'entry-image');
  imgEntryImage.setAttribute('src', entry.photo);
  imgEntryImage.setAttribute('alt', 'image for entry in code journal');
  divEntryImageContainer.appendChild(imgEntryImage);

  var divColumnHalf2 = document.createElement('div');
  divColumnHalf2.setAttribute('class', 'column-half');
  divRow.appendChild(divColumnHalf2);

  var divEntryTextContainer = document.createElement('div');
  divEntryTextContainer.setAttribute('class', 'entry-text-container');
  divColumnHalf2.appendChild(divEntryTextContainer);

  var divEntryTitle = document.createElement('div');
  divEntryTitle.setAttribute('class', 'entry-title');
  divEntryTextContainer.appendChild(divEntryTitle);

  var headingThree = document.createElement('h3');
  var entryHeading = document.createTextNode(entry.title);
  headingThree.appendChild(entryHeading);
  divEntryTitle.appendChild(headingThree);

  // icon code
  var iconElement = document.createElement('i');
  iconElement.setAttribute('class', 'fas fa-pencil-alt');
  divEntryTitle.appendChild(iconElement);

  var divEntryParagraph = document.createElement('div');
  divEntryParagraph.setAttribute('class', 'entry-paragraph');
  divEntryTextContainer.appendChild(divEntryParagraph);

  var paragraphEntry = document.createElement('p');
  var paragraphText = document.createTextNode(entry.note);
  paragraphEntry.appendChild(paragraphText);
  divEntryParagraph.appendChild(paragraphEntry);

  return liJournalEntry;
}

function loadEntries(event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    var entryNode = createEntry(data.entries[i]);
    $ulEntries.prepend(entryNode);
  }
}

window.addEventListener('DOMContentLoaded', loadEntries);

var $newEntryButton = document.querySelector('.new-entry-button');
var $entriesAnchor = document.querySelector('.entries-anchor');
var $viewEntryForm = document.querySelector('.view-entry-form');
var $viewEntries = document.querySelector('.view-entries');

function viewEntryForm(event) {
  $viewEntryForm.className = 'view-entry-form';
  $viewEntries.className = 'hidden view-entries';
  data.view = 'entry-form';
}

function viewEntries(event) {
  $viewEntryForm.className = 'hidden view-entry-form';
  $viewEntries.className = 'view-entries';
  data.view = 'entries';
}

$newEntryButton.addEventListener('click', viewEntryForm);
$entriesAnchor.addEventListener('click', viewEntries);

if (data.view === 'entry-form') {
  $viewEntryForm.className = 'view-entry-form';
  $viewEntries.className = 'hidden view-entries';
} else {
  $viewEntryForm.className = 'hidden view-entry-form';
  $viewEntries.className = 'view-entries';
}
