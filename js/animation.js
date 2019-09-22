
var reAnimate = function() {
	var _ele = $(".columns");


	_ele.each(function(index, element) {
		var elementAnimate = $(element).find(".animated"); 
		elementAnimate.css({
			"animation-name": "none",
			"-webkit-animation": "none"
		}); 

		$(element).waypoint(function(direction) {
			//console.log(direction);
			if(direction == "up") {
				elementAnimate.css({
					"animation-name": "none",
					"-webkit-animation": "none"
				});
				elementAnimate.removeClass('fadeInUp').addClass('fadeInDown');

			} else {
				elementAnimate.removeClass('fadeInDown').addClass('fadeInUp');
				elementAnimate.css({
					"animation-name": "",
					"-webkit-animation": ""
				});
				//璁剧疆鎸囧畾鍖哄潡鍔ㄦ晥
				// for(var i = 0; i < elementAnimate.length; i++) {
				// 	if(index == 12||index == 19) {
				// 		var eid = $(element).attr('id');
				// 		//console.log(eid);
						
				// 		$(element).find("li").eq(1).css("animation-delay", ".2s");
				// 		$(element).find("li").eq(2).css("animation-delay", ".4s");
				// 		$(element).find("li").eq(3).css("animation-delay", ".6s");
				// 		$(element).find("li").eq(4).css("animation-delay", ".8s");
				// 	}
				// }
			}
		}, {
			offset: "90%"
		});
	});
};
var reAnimateDown = function() {
	var _ele = $(".columns");
	_ele.each(function(index, element) {
		var elementAnimate = $(element).find(".animated"); 
		elementAnimate.css({
			"animation-name": "none",
			"-webkit-animation": "none"
		}); 
		$(element).waypoint(function(direction) {
			if(direction == "up") {
				//				elementAnimate.css({
				//					"animation-name": "none",
				//					"-webkit-animation": "none"
				//				});
				elementAnimate.removeClass('fadeInUp').addClass('fadeInDown');
				elementAnimate.css({
					"animation-name": "",
					"-webkit-animation": ""
				});
			}
		}, {
			offset: "-120%"
		});
	});
};
reAnimate();
reAnimateDown();



