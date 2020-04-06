$('#myForm').submit((event) => {
	event.preventDefault();
	if ($('#text_input').val()) {
		$('#error').hide();
		const li = `<li> ${$('#text_input').val()} </li>`;
		$('#list').append(li);
		$('#myForm').trigger('reset');
		$('#text_input').focus();
	} else {
		$('#error').show();
		$('#error').html('You must enter an input value');
		$('#text_input').focus();
	}
});
