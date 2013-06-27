$(document).ready ->
	$('a[href^="/#"]').click (e) ->
		e.preventDefault()
		
		href = $(@).attr('href')
		id = href.substring(1, href.length)
		$.scrollTo id, 1000

	$('#lead-form').validate
		submitHandler: (form) ->
			formSubmit = $.post '/lead', $(form).serialize(), () ->
				$(form).append "<div class='submit-status'><div class='submit-success'>Thanks #{$('form #first-name').val()}! We'll be in touch soon.</div></div>"
				$(form).find('input:text, input:password, input:file, input:email, input:tel, select, textarea').val('')	
				_gaq.push(['_trackEvent', 'Forms', 'Submit', 'Request a Demo'])

			formSubmit.fail () ->
				$(form).append "<div class='submit-status'><div class='submit-error'>Oh no! We weren't able to send your request. <a href='#contact'>Email us</a> and we'll figure out what went wrong.</div></div>"

	$('.client-list-container').Swipe
		callback: (index) ->
			$('.position-indicators .indicator').eq(index).addClass('on').siblings().removeClass('on')
			setButtonVisibility()

	clientListSwiper = $('.client-list-container').data('Swipe')

	$('.position-indicators .indicator').click () ->
		clientListSwiper.slide($(this).index())

	$('.navigation-arrows button').click () ->
		switch $(this).data('slide-direction')
			when "left" then clientListSwiper.prev()
			when "right" then clientListSwiper.next()

	setButtonVisibility = () ->
		slidePosition = clientListSwiper.getPos()
		if slidePosition == 1 || slidePosition == clientListSwiper.getNumSlides() - 1
			$('.navigation-arrows button').last().css('visibility', 'hidden')
		if slidePosition == (clientListSwiper.getNumSlides() - 2)
			$('.navigation-arrows button').last().css('visibility', 'visible')
		if slidePosition == 0
			$('.navigation-arrows button').first().css('visibility', 'hidden')
		if slidePosition == 1
			$('.navigation-arrows button').first().css('visibility', 'visible')