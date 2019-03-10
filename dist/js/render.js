(function($,root){
	var $scope = $(document.body);
	function renderInfo(info){
		
		var html =`<div class="song-name">`+info.song+`</div>
				<div class="singer-name">`+info.singer+`</div>
				<div class="album-name">`+info.album+`</div>`;
		$scope.find('.song-info').html(html);
		var dur = ('0'+Math.floor(info.duration/60)).slice(-2)+':'+(info.duration%60)
		$scope.find('.all-time').text(dur);
	}
	function renderImg(src){
		var img = new Image();
		img.src = src;
		img.onload = function (){
			root.blurImg(img,$scope);
			$scope.find('.song-img img').attr('src',src)
		}
	}
	function renderIslike(islike){
		
		if(islike){
			$scope.find('.like-btn').addClass('liking')
		}else{
			$scope.find('.like-btn').removeClass('liking')
		}
	}
	
	root.render = function (data){
		renderInfo(data);
		renderImg(data.image);
		renderIslike(data.isLike);
		
	}
	
})(window.Zepto,window.player||(window.player={}))
