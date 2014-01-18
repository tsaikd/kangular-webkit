angular.module("kangular-webkit", [])

.provider("webkitNotify", function() {
	var config = this.config = {
		enable: !!window.webkitNotifications,
		icon: "http://www.justallnthing.com/wp-content/uploads/2013/04/Franksouza183-Fs-Apps-google-chrome.ico",
		title: "webkitNotify",
		timeout: 3000,
		display: function() {},
		onerror: function() {},
		onclose: function() {},
		onclick: function() {
			this.cancel();
		}
	};

	function webkitNotify(title, text) {
		if (!config.enable) {
			return this;
		}
		if (window.webkitNotifications.checkPermission() != 0) {
			window.webkitNotifications.requestPermission(function() {
				if (window.webkitNotifications.checkPermission() == 0) {
					webkitNotify.apply(this, arguments);
				}
			});
			return this;
		}
		var opt = angular.extend({}, config);
		if (angular.isObject(title)) {
			angular.extend(opt, title);
		} else if (title && !text) {
			angular.extend(opt, {
				title: config.title,
				text: title
			});
		} else {
			angular.extend(opt, {
				title: title,
				text: text
			});
		}
		if (!opt.title && !opt.text) {
			return this;
		}
		var nreq = window.webkitNotifications.createNotification(opt.icon, opt.title || "", opt.text || "");
		nreq.display = opt.display;
		nreq.onerror = opt.onerror;
		nreq.onclose = opt.onclose;
		nreq.onclick = opt.onclick;
		nreq.replaceId = JSON.stringify(opt);
		nreq.show();
		if (opt.timeout) {
			setTimeout(function() {
				nreq.cancel();
			}, opt.timeout);
		}
		return this;
	}

	this.$get = function() {
		return webkitNotify;
	};
});
