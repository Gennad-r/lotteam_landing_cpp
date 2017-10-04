

//Browser detection

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

//-----------------------------

var accentColor = '#1a1728', greyColor = "#cccccc"; // global colors



var balls = Snap("#balls").selectAll("circle"),
	animatedCassName;

if (isFirefox||isIE||isEdge) {
	animatedCassName = "balls-finished";
} else {
	animatedCassName = "balls-finished-animated";
}

function rand(min, max) {
	return Math.ceil(Math.random() * (max - min) + min);
}

var  i = 0;
function ballsStartPosition() {
	//for (var i = 0; i < balls.length; i++) {

		var el = Snap($('#balls circle:not(.'+animatedCassName+'):first')[0]);
		var x = rand(-90, 90), y = rand(-50, 50);
		
		el.attr({
			'transform': 'translate(' + x + ', ' + y + ')',
			'fill': greyColor
		}).animate({
			'transform': 'matrix(1,0,0,1,0,0)'
		}, 10);
		el.addClass(animatedCassName);
		//console.log(i);
		i++;

		if (i < $('#balls circle').length){
			setTimeout(ballsStartPosition, 20);
		}
	//}
}
function addBallsAnimation() {
	var first = $('#balls circle:not(.balls-animated):first'), i=0;
	try {if (i < $('#balls circle').length) {
		first.attr({
			//'transform': 'matrix(1,0,0,1,0,0)',
		});
		
		setTimeout(	
			function () {
				first.attr({'class': 'balls-animated'});
				first.css({'transition': '.5s'});
				i++;
				addBallsAnimation();
			}, 10);
	}} catch(e){
		return false;
	}
}
ballsStartPosition();


setTimeout(lineDraw, 4000);


function lineDraw() {
	function mult(e) {return e*e;}
	var lines = $("#lines line");
	for (var i = 0; i < lines.length; i++) {
		var line = Snap(lines[i]);
		var x = (Math.ceil(Math.sqrt(
			mult(lines[i].x2.baseVal.value - lines[i].x1.baseVal.value) +
			mult(lines[i].y2.baseVal.value - lines[i].y1.baseVal.value)	)));
		line.attr({
			'strokeDasharray': x,
			'strokeDashoffset': x,
			'stroke-width': 1,
			'stroke-linecap':'round',
			'stroke': greyColor
		});
		(function() {
			var lineClosure = line;
			Snap.animate(x, 0, function( val ){
				lineClosure.attr({
					'strokeDashoffset': val,
				});
			}, 2000);
		})();
	}
}

$(".owl-carousel").owlCarousel({
	items: 1,
	nav: true
});


//first screen slide
function slideFirst(cb) {
		$('html, body').animate({
			scrollTop: $('#challenges').offset().top
		}, 500, function () {
			//$('#first, video').css({"display":"none"});
			
			cb();
		});
}

function slideFirstScreen() {
	slideFirst(function () {
		$('.top-nav').addClass('regular-nav');
	});
}

$('.scroll').click(function () {
	slideFirstScreen();
});

setTimeout(function () {
	if ($(window).scrollTop() == 0) {
		slideFirstScreen();
	}
}, 100);

// icons animation
Snap.selectAll(".b-icon path").attr({
	'fill' : 'none',
	'stroke' : 'none',
	'transform-origin' : '50% 50%'
});

function BIcon(id) {
	this.icon = {
		'obj' : $(id),
		'strs' : Snap(id).selectAll(".icon-1-f path"),
		'mObj' : Snap(id).selectAll(".icon-1-b path"),
		'scrolled' : false,
		
	};
	//this.scrolled = false;
	this.run = function (srartAttr, finishAttr) {
		var objPos = this.icon.obj.offset().top,
			mObj = this.icon.mObj,
			cScrolled = this.icon.scrolled,
			strs = this.icon.strs;
			//scrolled = false;
		$(window).on('scroll', function () { //start
			if ($(window).height() + $(window).scrollTop() > objPos) {
				cScrolled = true;
				console.log(cScrolled);
			}
			if (cScrolled) {
				//$(window).off();
				console.log(cScrolled);
				mObj.attr(srartAttr).animate(finishAttr, 3000, mina.easein);
				for (var i = 0; i < strs.length; i++) {
					var str = strs[i],
					len = Math.ceil(str.getTotalLength());
					str.attr({
						'strokeDasharray': len,
						'strokeDashoffset': len,
						'stroke-width': 2,
						'stroke-linecap':'round',
						'stroke': accentColor,
						'fill' : 'none'
					});
					(function() {
						var strClosure = str;
						Snap.animate(len, 0, function( val ){
							strClosure.attr({
								'strokeDashoffset': val,
							});
						}, 900, mina.easeout, function () {
							strClosure.attr({
								'fill' : accentColor,
								'stroke' : 'none'
							});
						});
					})();
				} //for
			}
			return this;
		}); //finish
	};
}


var icon1 = new BIcon("#icon1").run({
	'transform':'translate(0,-50)',
	'fill': greyColor
}, {
	'transform':'translate(0,0)'
});
var icon2 = new BIcon("#icon2").run({
	'transform-origin' : '50% 70%',
	'transform':'rotate(-90)',
	'fill': greyColor
}, {
	'transform':'translate(0,0)'
});
var icon3 = new BIcon("#icon3").run({
	'transform':'scale(0.5)',
	'fill': greyColor
}, {
	'transform':'translate(0,0)'
});

var icon4 = new BIcon("#icon4").run({
	'transform':'translate(0,-60) rotate(-120)',
	'fill': greyColor
}, {
	'transform':'translate(0,0)'
});

var icon5 = new BIcon("#icon5").run({
	'transform':'scale(1.7) rotate(-90)',
	'fill': greyColor
}, {
	'transform':'translate(0,0)'
});

