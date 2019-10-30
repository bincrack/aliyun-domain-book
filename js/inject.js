$(function() {
	var suffixs = ["com", "net", "org", "cc", "cn", "com.cn"];
	var token = window.um.getToken();
	var domain_name_check = function() {
		$("div.table table tbody tr td[data-field='domain_name']").map(function() {
			var td = this;
			var item = $(td).find("input[type='checkbox']").val();
			var name = item.substring(0, item.lastIndexOf("."));
			var d = new Date();
			var div = $(td).find("div.other");
			if (div.length > 0) {
				div.remove();
			}
			div = document.createElement("div");
			div.className = "other";
			suffixs.map(function(suffix) {
				var callback = "jsonp_" + d.getTime() + "_" + Math.floor(Math.random() * 100000);
				var url = "https://checkapi.aliyun.com/check/checkdomain?domain=" + name + "." + suffix + "&command=&token=" + token + "&ua=&currency=&site=&bid=&_csrf_token=&callback=" + callback;
				var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = url;
				document.body.appendChild(script);

				var span = $(td).find("span." + suffix);
				if (span.length > 0) {
					span.remove();
				}

				span = document.createElement("span");
				span.id = callback;
				span.className = "com";
				span.innerText = ".";
				$(div).append(span);

				eval(callback + " = function(data) {checkdomain('" + callback + "', data, '" + suffix + "')}");
			});
			$(td).append(div);
		})
	};
	var check_thead = document.createElement("a");
	check_thead.href = "javascript:;"
	check_thead.innerText = "check";
	check_thead.onclick = domain_name_check;
	var check_footer = document.createElement("a");
	check_footer.href = "javascript:;"
	check_footer.innerText = "check";
	check_footer.onclick = domain_name_check;
	$("div.table table thead tr th[data-field='domain_name']").append(check_thead);
	$("div.batch").append(check_footer);

	console.log("content-inject...");
});
function checkdomain(id, data, suffix) {
	var color = "#333";
	if (data && data.errorCode == 0) {
		if (data.module[0].avail == 0) {
			color = "#777";
		} else if (data.module[0].avail == 1) {
			color = "#5cb85c";
		} else if (data.module[0].avail == 4) {
			color = "#5cb85c";
		} else if (data.module[0].avail == 5) {
			color = "#777";
		} else {
			suffix += "：" + data.module[0].avail;
			color = "#ff5029";
		}
	}

	$("#" + id).css({"margin-left": "5px", "padding": "0px 5px", "color": "#fff", "background": color}).text(suffix);
}