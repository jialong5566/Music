(function($,root){
	var $scope = $(document.body);
	var html='';
	function renderCurrent(index){
		$scope.find('li').removeClass('sign');
		$scope.find('li').eq(index).addClass('sign');
	}
	 function renderList (data){
		data.forEach(function(ele){
			html+='<li><h3>'+ele.song+'<span>'+ele.singer+'</span></h3></li>'
		})
		
		$scope.find('.list-wrapper').html(html);
	}
	root.renderList=renderList;
	root.renderCurrent= renderCurrent;
	
})(window.Zepto,window.player||(window.player={}))