$(document).ready ->
	$('a[href^="#"]').click ->
		$.scrollTo $(@).attr('href'), 1000

	$('#lead-form').validate
		submitHandler: (form) ->
			formSubmit = $.post '/lead', $(form).serialize(), () ->
				$(form).append "<div class='submit-status'><div class='submit-success'>Thanks #{$('form #first-name').val()}! We'll be in touch soon.</div></div>"
				$(form).find('input:text, input:password, input:file, input:email, input:tel, select, textarea').val('')	
				_gaq.push(['_trackEvent', 'Forms', 'Submit', 'Request a Demo'])

			formSubmit.fail () ->
				$(form).append "<div class='submit-status'><div class='submit-error'>Oh no! We weren't able to send your request. <a href='#contact'>Email us</a> and we'll figure out what went wrong.</div></div>"		
