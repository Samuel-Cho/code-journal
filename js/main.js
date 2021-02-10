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

function createEntry(entry) {
  var $ulEntries = document.querySelector('.entries-list');

  var liJournalEntry = document.createElement('li');
  liJournalEntry.setAttribute('class', 'journal-entry');
  $ulEntries.appendChild(liJournalEntry);

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

  var divEntryParagraph = document.createElement('div');
  divEntryParagraph.setAttribute('class', 'entry-paragraph');
  divEntryTextContainer.appendChild(divEntryParagraph);

  var paragraphEntry = document.createElement('p');
  var paragraphText = document.createTextNode(entry.note);
  paragraphEntry.appendChild(paragraphText);
  divEntryParagraph.appendChild(paragraphEntry);
}
