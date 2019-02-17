document.querySelector('#wrapper-container').style.display = 'none';
document.querySelector('#spinner-container').style.display = 'block';
window.onload = function() {
  setTimeout(function() {
    document.querySelector('#spinner-container').style.display = 'none';
    document.querySelector('#wrapper-container').style.display = 'block';
  }, 800);
};
