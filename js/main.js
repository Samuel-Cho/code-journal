/* global data */
/* exported data */
var $urlImage = document.querySelector('.url-image');
var $url = document.querySelector('#entry-form-photo-url');

function updateEntryImage(event) {
  var urlInputValue = event.target.value;
  $urlImage.setAttribute('src', urlInputValue);
}

$url.addEventListener('input', updateEntryImage);
