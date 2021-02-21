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
  if (data.editing === null) {
    var entryInputs = {};
    entryInputs.title = $newEntryForm.elements.title.value;
    entryInputs.photo = $newEntryForm.elements.photo.value;
    entryInputs.note = $newEntryForm.elements.note.value;
    data.entries.unshift(entryInputs);
    entryInputs.entryId = data.nextEntryId;
    data.nextEntryId++;
    var newEntryNode = createEntry(data.entries[0]);
    $ulEntries.prepend(newEntryNode);
  } else {
    data.editing.title = $newEntryForm.elements.title.value;
    data.editing.photo = $newEntryForm.elements.photo.value;
    data.editing.note = $newEntryForm.elements.note.value;
    for (var k = 0; k < data.entries.length; k++) {
      if (data.entries[k].entryId === data.editing.entryId) {
        data.entries[k] = data.editing;
        break;
      }
    }
    var editEntryNode = createEntry(data.editing);
    var $journalNodeList = document.querySelectorAll('.journal-entry');
    for (var x = 0; x < $journalNodeList.length; x++) {
      var journalEntryId = $journalNodeList[x].getAttribute('data-entry-id');
      if (journalEntryId === data.editing.entryId.toString()) {
        $journalNodeList[x].replaceWith(editEntryNode);
        break;
      }
    }
  }
  $urlImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
  data.editing = null;
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
  headingThree.setAttribute('class', 'journal-entry-title');
  var entryHeading = document.createTextNode(entry.title);
  headingThree.appendChild(entryHeading);
  divEntryTitle.appendChild(headingThree);

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
  $formHeading.textContent = 'New Entry';
  data.editing = null;
}

function viewEntries(event) {
  $viewEntryForm.className = 'hidden view-entry-form';
  $viewEntries.className = 'view-entries';
  $deleteButton.className = 'invisible delete-button';
  data.view = 'entries';
  $newEntryForm.reset();
  $urlImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.editing = null;
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

var $formHeading = document.querySelector('.form-heading');

function viewEditForm(event) {
  $viewEntryForm.className = 'view-entry-form';
  $viewEntries.className = 'hidden view-entries';
  $deleteButton.className = 'delete-button';
  $formHeading.textContent = 'Edit Entry';
}

var dataEntryId = null;

function editEntry(event) {
  if (event.target.matches('i')) {
    viewEditForm();
    var closestEntry = event.target.closest('.journal-entry');
    dataEntryId = closestEntry.getAttribute('data-entry-id');
    for (var j = 0; j < data.entries.length; j++) {
      if (data.entries[j].entryId.toString() === dataEntryId) {
        data.editing = data.entries[j];
        $newEntryForm.elements.title.value = data.editing.title;
        $newEntryForm.elements.photo.value = data.editing.photo;
        $urlImage.setAttribute('src', data.editing.photo);
        $newEntryForm.elements.note.value = data.editing.note;
        break;
      }
    }
  }
}

$ulEntries.addEventListener('click', editEntry);

var $deleteButton = document.querySelector('.delete-button');
$deleteButton.addEventListener('click', deleteModal);

function deleteModal(event) {
  event.preventDefault();
  $modalView.className = 'modal-view';
}

var $modalView = document.querySelector('.modal-view');

var $cancelButton = document.querySelector('.cancel-button');
var $confirmButton = document.querySelector('.confirm-button');

$cancelButton.addEventListener('click', function (event) {
  $modalView.className = 'hidden modal-view';
});

$confirmButton.addEventListener('click', function (event) {
  for (var y = 0; y < data.entries.length; y++) {
    if (data.entries[y].entryId.toString() === dataEntryId) {
      data.entries.splice(y, 1);
      // console.log(data.entries);
    }
  }
//   // delete from DOM
});
