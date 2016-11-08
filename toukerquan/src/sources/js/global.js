var ajaxResult = ["","操作成功","操作失败","请先登录","账户冻结","用户名或者密码错误","数据错误","",""];

$(function() {
	$(".login").click(function() {
		$.ajax({
			type : "post",
			url : "login",
			data : {
				"u.username" : $("#uname").val(),
				"u.password" : $("#pwd").val()
			},
			success : function(result) {
				if (result == "success") {
					window.location.href = "/welcome.jsp";
				} else {
					$(".mess").text("用户名或密码错误");
				}
			},
			error : function(e) {
				console.log(e);
			}
		});
	});
	$(".logout").click(function() {
		$.ajax({
			type : "post",
			url : "logout",
			success : function() {
				window.location.href = "/";
			}
		});
	});
	$(".menu_header").on("click", function() {
		$(this).parent().siblings().find("ul").hide();
		$(this).next().toggle();
	});
	$(".menu_link").on("click", function() {
		$(".menu_link").removeClass("menu_selected");
		$(this).addClass("menu_selected");
	});
});