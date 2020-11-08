	(function(data){
		$.fn.myBanner = function(data) {
			this.config = {
				nowIndex: 0,  //当前显示的图片索引
				hasStarted: false,  // 是否开始轮播
				interval: null,  // 轮播
				liItems: null,  // li集合
				itemsLength: 0,  // 集合长度
				indicatorDomList: null,  // 指示器集合
				operationDomList: null   ,// 前后操作集合
				time:4000,        // 间隔时间
			}
			var that = this;
			this.init = function() {
				this.config.liItems = this.find('ul').find("li");
				this.config.itemsLength = this.config.liItems.length;
				this.config.indicatorDomList = this.find("#indicators");
				this.config.operationDomList = this.find("#bg_btn");
				
				// 显示第一张图片
				this.config.liItems.first("li").css({
					'opacity': 1,
					'z-index': 1
				}).siblings('li').css({
					'opacity': 0,
					'z-index': 0
				})
				
				// 初始化指示器
				var pers = '';
				for (var i = 0; i < this.config.itemsLength; i++) {
				    pers += '<div><span></span></div>';
				}
				$(pers).appendTo(this.config.indicatorDomList);
				this.config.indicatorDomList.find('div:first').find('span').css({
					'width':'0%',
					'background': 'rgba(255,255,255,1)'
				});
				
				// 动画
				this.config.liItems.first('li').find('a').find('img').css({  // 放大
					'transform':'scale(1.2)'
				})
				this.config.indicatorDomList.find('div:first').addClass("indicator-active").find('span').animate({
					width:'100%',
				},that.config.time,'linear',function(){
					// $(this).css('background',"rgba(255,255,255,.43)")
				});
				this.config.operationDomList.hide();  // 隐藏左右
				
				//鼠标移入banner图时，停止轮播并显示前后按钮，移出时开始轮播并隐藏前后按钮
				this.hover(function () {
				   that.config.operationDomList.fadeIn(200);
				    //that.stop();
				}, function () {
				   that.config.operationDomList.fadeOut(200);
				   //that.start();
				});
				
				// 在鼠标移入左右切换的时候停止动画&&不然会有同时切换的可能导致BUG
				that.config.operationDomList.find('.next-btn').hover(function(){
					that.stop();
				},function(){
					that.start();
				})
				that.config.operationDomList.find('.prev-btn').hover(function(){
					that.stop();
				},function(){
					that.start();
				})
				//鼠标移入指示器时，显示对应图片，移出时继续播放
				// this.config.indicatorDomList.find('div').hover(function () {
				//     that.stop();
				//     var out = that.config.indicatorDomList.find('div').filter('.indicator-active').index();
				//     that.config.nowIndex = $(this).index();
				//     if (out != that.now) {
				//         that.play(out, that.config.nowIndex)
				//     }
				// }, function () {
				//     that.start();
				// });
				//点击左右按钮时显示上一张或下一张
				that.config.operationDomList.find('a:first').click(function () {
				    that.next()
				});
				that.config.operationDomList.find('a:last').click(function () {
				    that.prev()
				});
			}
			
			/**
			 * 播放函数
			 * @param out number 要消失的图片的索引值
			 * @param now number 接下来要轮播的图的索引值
			 */
			this.play = function (out, now) {
				this.config.liItems.eq(now).find('a').find('img').css({  // 放大
					'transform':'scale(1.2)'
				})
				this.config.liItems.eq(now).siblings('li').find('a').find('img').css({  // 重置其他动画
					'transform':'scale(1)'
				})
			    this.config.liItems.eq(out).stop().animate({
			        opacity: 0,
			        'z-index': 0
			    }, 500).end().eq(now).stop().animate({
			        opacity: 1,
			        'z-index': 1
			    }, 500);
				this.config.indicatorDomList.find('div').eq(now).find('span').css({
					'width':'0%',
					'background': 'rgba(255,255,255,1)'
				});
				this.config.indicatorDomList.find('div').eq(now).siblings('div').find('span').css('background',"rgba(255,255,255,.43)");
				this.config.indicatorDomList.find('div').eq(now).siblings('div').find('span').stop().animate({width:'100%'},0);  // 重置其他动画
				this.config.indicatorDomList.find('div').eq(now).find('span').stop().animate({width:'0%'},0);  // 修补点击换页过快
			    this.config.indicatorDomList.find('div').removeClass('indicator-active').eq(now).addClass('indicator-active').find('span').animate({
					width:'100%',
				},that.config.time,'linear',function(){
					// $(this).css('background',"rgba(255,255,255,.43)")
				});
			}
			
			//前一张函数
			this.prev = function () {
			    var out = that.config.nowIndex;
			    that.config.nowIndex = (--that.config.nowIndex + this.config.itemsLength) % this.config.itemsLength;
			    this.play(out, that.config.nowIndex)
			}
			
			//后一张函数
			this.next = function () {
			    var out = that.config.nowIndex;
			    that.config.nowIndex = ++that.config.nowIndex % this.config.itemsLength;
			    this.play(out, that.config.nowIndex);
			}
			
			//开始函数
			this.start = function () {
			    if (!this.config.hasStarted) {
			        this.config.hasStarted = true;
			        this.interval = setInterval(function () {
			            that.next();
			        }, that.config.time);
			    }
			}
			//停止函数
			this.stop = function () {
			    clearInterval(this.interval); 
			    this.config.hasStarted = false;
			}
			this.init();
			this.start();
	 	}
	 })($)
	
	



 