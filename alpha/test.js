//jshint esversion:10


const date = (function sentDateTime() {
  const today = new Date();
  const noToWord = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = noToWord[today.getMonth()];
  const date = today.getDate() + '/' + month + '/' + today.getFullYear();
  const time = today.getHours() + ":" + today.getMinutes();
  return (date + ' ' + time);
})();