import './index.scss'
import '../../assets/Common.js';
import "../../assets/js/waterfallFlow.js"
var tabs = [
	{
		name:"ALL",
		id:1
	},{
		name:"INDOOL",
		id:2
	},{
		name:"ARCHITECTURE",
		id:3
	}
],
labels = [
	{
		name:"酒店",
		id:1
	},{
		name:"会展中心",
		id:2
	},{
		name:"学校",
		id:3
		
	}
]
$(function(){
	// 生成tabs
	var perDom = "<ul>",labDOm = '<ul>';
	for(var i=0;i<tabs.length;i++) {
		perDom += "<li data-id="+ tabs[i].id +" >" + tabs[i].name + "</li>"
	}
	perDom += "</ul>"
	$('#tabContainer').append(perDom).find('ul').find('li').eq(0).addClass('tab_active');
	// li点击事件
	var liDom = $('#tabContainer').find('ul').find('li');
	liDom.click(function(){
		liDom.removeClass();
		$(this).addClass('tab_active');
	})
	
	// 生成标签
	for(var i=0;i<labels.length;i++) {
		labDOm += "<li data-id="+ labels[i].id +" ><span class='title'>" + labels[i].name + "</span><span class=line >/</span></li>"
	}
	labDOm += "</ul>"
	$('#tabLabel').append(labDOm).find('ul').find('li').eq(0).find('.title').addClass('label_active');
	$('#tabLabel').find('ul').find('li:last').find('.line').css('display','none');
	// li点击事件
	var liDoms = $('#tabLabel').find('ul').find('li');
	liDoms.click(function(){
		liDoms.find('.title').removeClass('label_active');
		liDoms.eq($(this).index()).find('.title').addClass('label_active');
	})
	
	
})

