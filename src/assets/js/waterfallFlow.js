var imgList = [
	{
		src:require('../img/1.png'),
		type:1,
		id:1,
	},
	{
		src:require('../img/2.png'),
		type:1,
		id:2,
	},
	{
		src:require('../img/3.png'),
		type:2,
		id:3,
	},
	{
		src:require('../img/4.png'),
		type:1,
		id:4,
	},
	{
		src:require('../img/5.png'),
		type:3,
		id:5,
	},
	{
		src:require('../img/6.png'),
		type:1,
		id:6,
	},
	{
		src:require('../img/7.png'),
		type:1,
		id:7,
	},
	{
		src:require('../img/8.png'),
		type:1,
		id:8,
	},
	{
		src:require('../img/9.png'),
		type:1,
		id:9,
	},
	{
		src:require('../img/10.png'),
		type:1,
		id:10,
	}
]
$(function() {
	var column = 3,pers = "",perWidth = parseInt($('.content_wrapper').width()/column-2);
	console.log($('.content_wrapper').width())
	// 创建第一行基准
	for(var i=0;i<imgList.length;i++) {
		pers += "<div class=box style=width:" + perWidth + "px;opacity:0><div class=boximg ><img src="+imgList[i].src+" data-id="+ imgList[i].id +" data-type="+ imgList[i].type +" /></div></div>"
	}
	$(pers).appendTo($('.content_wrapper'))
	// 瀑布流函数
	function waterFlow() {
		var arr = [];
		for(var i=0;i<$('.box').length;i++) {
			if(i < column) {
				arr[i] = $('.box').eq(i).innerHeight();
			}else {
				var minH = Math.min.apply(null,arr);  // 取最小值
				var index = getMinIndex(arr,minH);
				$('.box').eq(i).css({
					'position':'absolute',
					'top': minH + 'px',
					'left': $(".box").eq(index).position().left+'px',
				})
				arr[index]+=$(".box").eq(i).innerHeight();  //将布局好的该div的高度和该div上面的div高度相加，重新放入数组
			}
			$('.box').eq(i).animate({
				opacity:1
			},600)
		}
		function getMinIndex(arr,min){       //取得数组中最小高度的div的索引
		   for(var i in arr){
			if(arr[i]==min){
				return i;
			}
		   }
	    }
		
	}
	var img_length = $("img").length;
	var img_start = 1;
	$("img").on('load',function(){
		img_start ++;
		if(img_start == img_length){
		    //加载完成
			waterFlow();
			// 滚动监听
			window.onscroll = function() {
				if($(document).scrollTop()+$(window).height()>=$(document).height()){
					for(var i=0;i<imgList.length;i++){
						var html="<div class=box style=width:" + perWidth + "px;opacity:0><div class=boximg ><img src="+imgList[i].src+" data-id="+ imgList[i].id +" data-type="+ imgList[i].type +" /></div></div>";
						$(html).appendTo($('.content_wrapper'));                       //向容器内一次性添加12个图片
					}
					waterFlow();                                            //瀑布流布局
				}  
			}
			
			// 图片点击事件
			$('.content_wrapper').find('.box').find('.boximg').find('img').click(function(e){
				var id = e.originalEvent.target.dataset.id,
					type = e.originalEvent.target.dataset.type;
					
					console.log('当前点击图片参数','id:'+id,'type:'+type)
			})
		}
	})
})


