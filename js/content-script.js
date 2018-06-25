$(function() {
	var token = null;
	var inject = document.createElement('script');
	inject.type = "text/javascript";
	inject.src = chrome.extension.getURL('js/inject.js');
	inject.onload = function() {
		this.remove();
	};
	document.body.appendChild(inject);
	
	console.log("content-script...");
});