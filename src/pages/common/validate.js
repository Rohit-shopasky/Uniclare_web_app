export const acceptNumber = function (evt) {
  console.log(evt.keycode)
  var charCode;
  if (window.event)
    charCode = window.event.keyCode;   //if IE
  else
    charCode = evt.which; //if firefox
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}

export const charKeydown = function (evt) {
  var charCode;
  if (window.event)
    charCode = window.event.keyCode;  //for IE
  else
    charCode = evt.which;  //for firefox
  if (charCode == 32) //for &lt;space&gt; symbol
    return true;
  if (charCode > 31 && charCode < 65) //for characters before 'A' in ASCII Table
    return false;
  if (charCode > 90 && charCode < 97) //for characters between 'Z' and 'a' in ASCII Table
    return false;
  if (charCode > 122) //for characters beyond 'z' in ASCII Table
    return false;
  return true;
}
