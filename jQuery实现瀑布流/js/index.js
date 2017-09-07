
// 当页面加载完毕
//window.onload = function () {
//	alert(0);
//}

// 当页面加载完毕
$(window).on('load',function () {
	// 1.实现瀑布流布局
	waterFall();
	// 2.实现滚动加载
	$(window).on('scroll',function () {
		// 判断是否加载
		if (checkWillLoad()) {
			// 造数据
			var data = {'dataImg':[{'img':'1.jpg'},{'img':'10.jpg'},{'img':'13.jpg'},{'img':'15.jpg'},{'img':'17.jpg'},{'img':'19.jpg'}]};
			// 遍历创建盒子,创建了一个div，设置类名为box，
			$.each(data.dataImg,function (index,value) {
				var newBox = $('<div>').addClass('box').appendTo($('#main'));
			var newPic = $('<div>').addClass('pic').appendTo($(newBox));
			$('<img />').attr('src','imgs/'+$(value).attr('img')).appendTo($(newPic));
			})
			// 实现瀑布流布局
			waterFall();
		}
	});
	
//	alert(134);
});

// 实现瀑布流布局
function waterFall(){
	// 拿到所有的盒子
	var allBox = $('#main .box');
//	alert($(allBox).length);
	// 取出其中一个盒子的宽度,outerWidth带边距的宽度 202
	var boxWidth = $(allBox).eq(0).outerWidth();
	// 取出屏幕的宽度
	var screenWidth = $(window).width();
	// 求出列数
	var cols = Math.floor(screenWidth / boxWidth);
	// 父标签居中
	$('#main').css({
		width:cols * boxWidth + 'px',
		margin:'0 auto'
	})
	// 对子盒子定位
	var heightArr = [];
	// 遍历
	$.each(allBox, function(index,value) {
		// 取出单独的盒子高度
		var boxHeight = $(value).outerHeight();
		// 判断，
		if (index < cols) { // 第一行盒子
			heightArr[index] = boxHeight;
		} else{ // 剩余行的盒子
			// 取出高度数组中最矮的高度
			var minBoxHeight = Math.min.apply(null,heightArr);
			// 取出最矮高度对应的索引
			var minBoxIndex = $.inArray(minBoxHeight,heightArr);
			// 定位
			$(value).css({
				position:'absolute',
				top:minBoxHeight+'px',
				left:minBoxIndex * boxWidth + 'px'
			});
			// 更新数组中最矮的高度
			heightArr[minBoxIndex] += boxHeight;
			
		}
	});
//	alert(cols);
}

// 设置滚动条件
function checkWillLoad () {
	// 拿到最后一个盒子
	var lastBox = $('#main>div').last();
	// 取出最后一个盒子高度的一半 + 头部偏离位置
	var lastBoxDis = $(lastBox).outerHeight() + $(lastBox).offset().top;
	// 求出浏览器高度
	var clientHeight = $(window).height();
	// 求出页面偏离浏览器的高度
	var scrollTopHeight = $(window).scrollTop();
	
	console.log(lastBoxDis,clientHeight,scrollTopHeight);
	// 比较返回
	return lastBoxDis <= clientHeight + scrollTopHeight;
}