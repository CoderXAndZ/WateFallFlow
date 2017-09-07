
function $(id) {//id 参数
	return typeof(id)=== 'string' ? document.getElementById(id) : id;
}

// 当网页加载完毕
window.onload = function () {
	// 瀑布流布局
	waterFall('main','box');
	// 滚动加载盒子
	window.onscroll = function () {
//		alert(0);
		// 条件是否加载
		if (checkWillLoad()) {
			// 假数据
			var data = {'dataImg':[{'img':'1.jpg'},{'img':'10.jpg'},{'img':'13.jpg'},{'img':'15.jpg'},{'img':'17.jpg'},{'img':'19.jpg'}]}
			// 加载数据
			for (var i=0;i<data.dataImg.length;i++) {
				// 创建最外面的盒子
				var newBox = document.createElement('div');
				newBox.className = 'box';
				// 拿到父盒子，并插入
				$('main').appendChild(newBox);
				// 创建里面的盒子
				var newPic = document.createElement('div');
				newPic.className = 'pic';
				// 插入到父盒子，
				newBox.appendChild(newPic);
				// 创建img
				var newImg = document.createElement('img');
				newImg.src = 'imgs/' + data.dataImg[i].img;
				newPic.appendChild(newImg);
			}
			// 瀑布流布局
			waterFall('main','box');
		} 
	}
}

// 实现瀑布流布局
function waterFall (parent,child) {// 最需要的两个参数：父盒子和子盒子
	// -----子盒子在父盒子中居中-----
	// 获取屏幕宽度，然后除以图片宽度，得到图片的列数
	// 1.1 拿到父盒子中所有的子盒子
	var allbox = $(parent).getElementsByClassName(child);

	// 1.2 求出盒子的宽度 202
	var boxWidth = allbox[0].offsetWidth;

	// 1.3 动态求出浏览器的宽度，包括边线的宽
	var screenWidth = document.body.offsetWidth;

	// 1.4 求出列数并取整
	var columns = Math.floor(screenWidth / boxWidth);
	
	// 1.5 让父标签居中
	$(parent).style.width = boxWidth * columns +'px';
	$(parent).style.margin = '0 auto';
	
	// ---- 子盒子定位 ----
	// 1.1 高度数组
	var heightArr = [];
	// 1.2 遍历所有的盒子，将每个盒子的高度放在数组中
	for (var i=0;i<allbox.length;i++) {
		// 1.2.1 求出单个盒子的高度
		var boxHeight = allbox[i].offsetHeight;
		if (i < columns) { // 取出第一行的盒子
			heightArr.push(boxHeight);
		} else{ // 需要定位的盒子
			// 1.2.1 求出最矮盒子的高度
			var minBoxHeight = Math.min.apply(this,heightArr);
			// 1.2.2 求出最矮盒子对应的索引
			var minBoxIndex = getMinBoxIndex(minBoxHeight,heightArr);
			// 1.2.3 盒子定位
			allbox[i].style.position = 'absolute';
			allbox[i].style.top = minBoxHeight + 'px';
			allbox[i].style.left = minBoxIndex * boxWidth + 'px';
			// 1.2.4 更新数组中最矮盒子的高度
			heightArr[minBoxIndex] += boxHeight;
		}
	}
	
	console.log(heightArr);
}

// 取出数据中最矮盒子对应的索引
function getMinBoxIndex (val,arr) {
	for (var i in arr) {
		if (val == arr[i]) return i;
	}
}

// 判断是否符合条件
function checkWillLoad () {
	// 取出所有的盒子
	var allBox = $('main').getElementsByClassName('box');
	// 取出最后一个盒子
	var lastBox = allBox[allBox.length - 1];
	// 求出最后一个盒子高度的一半 + 头部偏离位置
	var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;
	// 求出浏览器的高度 标准模式和混杂模式
	var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
	//	alert(screenHeight);
	// 页面偏离屏幕的高度
	var scrollTopHeight = document.body.scrollTop;
//	console.log(lastBoxDis,screenHeight,scrollTopHeight);
	
	console.log(screenHeight);
	// 判断
	return lastBoxDis <= screenHeight + scrollTopHeight;

}