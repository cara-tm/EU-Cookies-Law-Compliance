/*! Simple EU Cookies Law Compliance without dependencies by cara-tm.com, 2017. MIT license */
function EU_cookies_law (r)
{

	'use strict';
	var msg = "You refuse external third-party cookies: none, at the initiative of this site, is present on your device.",
		future = '1 Month',
		minutes = 1,
		no_alowed_cookies = "Currently, your browser is set to disable cookies (check preferences).";

	var domain = window.location.hostname,
		lang = (navigator.language || navigator.browserLanguage),
		countries = ['AT','BE','BG','HR','CZ','CY','DK','EE','FI','FR','DE','EL','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','SK','SI','ES','SE','GB','UK'],
		affected = 1,
		seconds = 60,
		mins = minutes,
		accept_cookies = document.getElementById('ok-cookies'),
		refuse_cookies = document.getElementById('no-cookies');

	if (false !== navigator.cookieEnabled) {

		for (var i=0; i < countries.length; i++) {

			if ( countries[i] === lang.substring(0, 2).toUpperCase() ) {
				affected !== 0;
				break;
			}
		}

		if (affected !== 1) {
			sanitize_msg('');
			jsloader(r);
		} else 
			check_cookies();

		accept_cookies.onclick = function (evt) {
			evt.preventDefault();
			launch(evt);
		};

		function launch () {
			future = Number( future.replace(/\D+$/, '') );

			var expires = new Date(new Date().setMonth( new Date().getMonth()+future) );
			cookie_creation('Ok', expires);
			jsloader(r);
			sanitize_msg('');
		};

		refuse_cookies.onclick = function (evt) {
			evt.preventDefault();
			var tomorrow = new Date( new Date().setDate(new Date().getDate()+1) );

			cookie_creation('No', tomorrow);
			sanitize_msg(msg);
			window.location='';
		};

		function getCookie (sName) {
			var oRegex = new RegExp('(?:; )?' + sName + ' = ([^;]*);?');

			if ( oRegex.test(document.cookie) ) 
				return decodeURIComponent(RegExp.$1);
			else 
				return null;
		};

		function check_cookies () {
			tick();
			if (getCookie(domain) === 'Ok' + domain) {
				sanitize_msg('');
				jsloader(r);
			} else if (getCookie(domain) === 'No' + domain) {
				sanitize_msg(msg);
			}
		};

		function cookie_creation (c, e) {
			return document.cookie = domain + '=' + encodeURIComponent(c + domain) + ';expires= ' + e.toGMTString();
		}

		function jsloader (el) {
			var s = [],
				a = document.getElementsByTagName('script')[0];
			if ( !window.scriptHasRun ) {
				window.scriptHasRun = true;

				for (var i=0; i < el.length; i++) {
					if (el[i] !== 0 || !window.scriptHasRun) {
						window.scriptHasRun = true;
						s[i] = document.createElement('script');
						s[i].src = el[i];
						document.getElementsByTagName('head')[0].appendChild(s[i]) || a.parentNode.insertBefore (s[i], a);
					}
				}
			}
		}

		function tick () {

			if( minutes !=0 && null !== document.getElementById('counter') ) {
				var counter = document.getElementById('counter'),
					current_minutes = mins-1;
					seconds--;

				if (typeof counter.innerHTML !== null)
					counter.innerHTML = current_minutes.toString() + ':' + (seconds < 10 ? '0' : '') + String(seconds);

				if (seconds > 0) {
					setTimeout (tick, 1000);
				} else {
					if (mins > 1) {
						countdown(mins - 1);
					}
				}

				if (seconds == 0) {
					launch();
					sanitize_msg('');
				}

			} else 
				document.getElementById('cookies-delay').innerHTML = '';
		}

	} else 
		sanitize_msg(no_alowed_cookies);

	function sanitize_msg (m) {
		document.getElementById('cookies-delay').innerHTML = '';
		return document.getElementById('cookie-choices').innerHTML = m;
	}
};