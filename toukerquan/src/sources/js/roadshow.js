/**
 * 增加或修改路演
 * @param {Object} form
 * @param {Number} t (1:增加;2:修改)
 */
function addorUpdateRoadshow(form) {
	var $form = $(form);
	$form.ajaxSubmit({
		type: 'post',
		//		url: $form.attr("action"),
		url: "http://localhost:8081/j/saveRoadshow",
		success: function(data) {
			data = eval("(" + data + ")");
			if(data.protocolId && data.protocolId == 1) {
				$("#modal_mess .modal-body").html('<h3>' + ajaxResult[data.state] + '</h3>');
				$('#modal_mess').modal('show');
			}
		}
	});
	return false;
}
/**
 * 获取路演信息
 * @param {Number} id
 * @param {Number} t (1:路演信息;2:编辑路演)
 */
function getRoadshow(id,t) {
	$.ajax({
		type: "get",
		//		url:"getRsList",
		url: "http://192.168.1.11:8081/j/getRoadshow",
		data: {
			"st" : 0,
			"id": id
		},
		async: true,
		success: function(result) {
			result = eval("(" + result + ")");
			if(t == 1){
				$(".videoImg").attr("src",result.videoImg);
				$(".title").text(result.title);
				$(".url").text(result.url);
				$(".sponsor").text(result.sponsor);
				$(".cosponsor").text(result.cosponsor);
				$(".introduction").text(result.introduction);
				var process = result.activityflow;
				var processHtml = ''
				$(".process").empty();
				$.each(process,function(i,it){
					processHtml += '<li>';
					processHtml += '<span>' + it[0] + '_' + it[1] +'</span>';
					processHtml += '</li>';
				});
				$(".process").append(processHtml);
				$(".littleurl").attr("src",result.littleurl);
				$(".company").text(result.company);
				
			}else if(t == 2){
				$("#video_type").val(result.videoType);
				$("#video_url").val(result.url);
				$("#roadshow_type").val(result.type);
				$("#videoImgStr").val(result.videoImg);
				$("#showVideoImg").attr("src",result.videoImg);
				$("#video_tit").val(result.title);
				$("#video_sponsor").val(result.sponsor);
				$("#starttime,#starttime2").val(result.startTime);
				$("#endtime,#endtime2").val(result.endTime);
				$("#co_sponsors").val(result.cosponsor);
				$("#short_intro").val(result.introduction);
				var process = result.activityflow;
				var processHtml = ''
				$(".process").empty();
				$.each(process,function(i,it){
					processHtml += '<div class="col-md-6">';
					processHtml += '<label for="">流程' + (i+1) + '：</label>';
					processHtml += '<input id="" type="text" name="process" class="form-control" value="' + it[0] + '_' + it[1] +'"/>';
					processHtml += '</div>';
				});
				$(".process").append(processHtml);
				$("#intro").val(result.company);
				$("#introImgStr").val(result.littleurl);
				$(".showIntroImg").attr("src",result.littleurl);
			}
		}
	});
}

/**
 * 查询路演列表或单个路演的信息
 * @param {Number} t 类型(1:发行路演;2:推介路演)
 * @param {Number} n 每页条数
 * @param {Number} pn 查询的页码
 */
function getRoadshowList(t, n, pn) {
	var data = {};
	if(t == 0) {
		data.st = 1;
		data.rst = t;
	} else {
		data.st = 1;
		data.rst = t;
		data.n = n;
		data.pn = pn;
	}
	$.ajax({
		type: "get",
		//		url:"getRsList",
		url: "http://192.168.1.11:8081/j/getRoadshow",
		data: data,
		async: true,
		success: function(result) {
			result = eval("(" + result + ")");
			if(result.rlist) {
				$(".curPage").text(result.curPage);
				$(".allPage").text(result.allPage);
				$(".allNum").text(result.allNum);
				var html = '';
				$(".rslist tbody").empty();
				$.each(result.rlist, function(i, it) {
					var videoType = '';
					if(it.videoType == 1) {
						videoType = '发行路演';
					} else if(it.videoType == 2) {
						videoType = '推介路演';
					}
					html += '<tr><td>' + (i + 1) + '</td>' +
						'<td>' + it.id + '</td>' +
						'<td><a href="detail.html?id=' + it.id + '" title="' + it.title + '">' + it.title + '</a></td>' +
						'<td>' + it.updateTime + '</td>' +
						'<td>' + videoType + '</td>' +
						'<td>' + it.author + '</td>' +
						'<td><a href="index.html?id=' + it.id + '" class="btn btn-primary btn-xs">编辑</a>&emsp;<a href="#" class="btn btn-danger btn-xs">删除</a></td></tr>';
				});
				$(".rslist tbody").append(html);
			}
		}
	});
}