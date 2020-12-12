$('#myForm').submit((event) => {
  event.preventDefault();
  if ($('#text_input').val().trim()) {
    $('#error').hide();
    $('#formLabel').removeClass('error');
    $('#text_input').removeClass('inputClass');
    const li = `<li> ${$('#text_input').val()} </li>`;
    $('#list').append(li);
    $('#myForm').trigger('reset');
    $('#text_input').focus();
  } else {
    $('#error').show();
    $('#error').html('You must enter an input value');
    $('#formLabel').addClass('error');
    $('#text_input').addClass('inputClass');
		$('#text_input').focus();
		$('#text_input').value= "";
  }
});
