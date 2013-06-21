$(document).ready ->
	$('a[href^="#"]').click ->
		$.scrollTo $(@).attr('href'), 1000