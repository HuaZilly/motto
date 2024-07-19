


$('a.grey-button, a.img-btn').click(function () {
	// alert('asdas');
	var timeoutHandle = 0;
	pageURL = $(this).attr('rel');
	$('.popup-wrapper').show();
	$('body').addClass('no-scroll');
	$('.related-product').load(pageURL + ' .product-item', function () {
		// alert('new');
		$('.related-product').addClass('white');
		if ($('.related-product').is(':empty')) {
			$('.related-product').html('<h4>We’re sorry! All of these items have sold out</h4>');
		}

		var attributes = [];
		var wishchk;
		var l;
		var attrinames, names;
		var attrivalues;
		var api, value_id, value_name, value_url, value_compare_image;
		var wish = localStorage.getItem('wish');
		if (wish != null) {
			//console.log(wish);
			wishchk = wish.split("-");
		}

		var test = wish ? wish : '';
		$('.check').on('click', function () {
			// alert('old'); 
			var wish = localStorage.getItem('wish');
			console.log(wish);
			if (wish != null) {
				wishchk = wish.split("-");
			}
			var test = wish ? wish : '';
			$(this).hide();
			$(this).siblings('.wished').show();
			if (test == '')
				test = $(this).data('product-id') + "-";
			else
				test = test + $(this).data('product-id') + '-';
			localStorage.setItem('wish', test);
		});

		$('.wished').on('click', function () {
			// alert('what'); 
			var wish = localStorage.getItem('wish');
			console.log(wish);
			if (wish != null) {
				wishchk = wish.split("-");
			}

			var itemid = $(this).data('product-id');
			itemid = itemid.toString();
			console.log(itemid);
			console.log(wishchk);
			if (jQuery.inArray(itemid, wishchk) != '-1') {
				console.log(itemid);
				wish = wish.replace(itemid + '-', '');
				//wish=wish.replace(itemid,'');
				localStorage.setItem('wish', wish);
			}
			$(this).hide();
			$(this).siblings('.check').show();

		});

		setTimeout(function(){
			$('.123').each(function(){
				var itemid=$(this).find('.check').data('product-id');
				itemid =itemid.toString();
				if (jQuery.inArray(itemid, wishchk)!='-1') {
					$(this).find('.check').hide();
					$(this).find('.wished').show();
				}
			},500)
		})
	});
})

$('.popup-window .close').click(function () {
	$('.related-product').empty();
	$('.popup-wrapper').fadeOut();
	$('body').removeClass('no-scroll');
})


$('body').on('click', function (e) {
	if (!$(e.target).closest(".popup-window").length && !$(e.target).closest(".grey-button").length && !$(e.target).closest(".img-btn").length) {
		if ($('.popup-window').is(':visible')) {
			$('.related-product').empty();
			$('.popup-wrapper').fadeOut();
			$('body').removeClass('no-scroll');
		}
	}
});
