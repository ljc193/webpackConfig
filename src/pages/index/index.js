import './index.scss'
import '../../assets/Common.js';
import './index.html';


$(function(){
	// 开场动画
	$('.animation_wrapper .content .line').animate({
		width:"100%",
	},2000,function(){
		$('.animation_wrapper').animate({
			opacity:'0'
		},800,function(){
			$('.animation_wrapper').css("display","none");
			location.href = './home.html';
		})
	})
})
