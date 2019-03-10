var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var songList;
var controlManager;
var index = 0;
var audio = new root.audioManager();
var proWid, topWid, x1;
//console.log(window)
function getData(url) {
	$.ajax({
		type: "get",
		url: url,

		success: function(data) {
			root.render(data[0]);
			root.renderList(data);
			root.renderCurrent(index);
			songList = data;
			bindEvent();
			controlManager = new root.controlManager(data.length);
			$scope.trigger('play:change', 0)
		},
		error: function() {
			console.log('error')
		}
	});
}
getData('../mock/data.json')

function bindEvent() {
	$scope.on('play:change', function(event, index) {
		audio.pause()
		audio.setAudioSource(songList[index].audio);
		if(audio.status == 'play') {
			audio.play();
			audio.status = 'play'
		}
		root.render(songList[index]);
		root.renderCurrent(index);
		audio.renderCur(0)
		audio.setAudioSource(songList[index].audio);
		audio.status = 'pause'
		$scope.find('.play-btn').removeClass('playing')
		audio.play()
		$scope.find('.play-btn').addClass('playing')

	})
	$scope.on('click', '.prev-btn', function() {
		//		index--;
		//		index = (index+songList.length)%(songList.length);
		var index = controlManager.prev();
		$scope.trigger('play:change', index)
	})
	$scope.on('click', '.next-btn', function() {
		//		index++;
		//		index = (index+songList.length)%(songList.length);
		var index = controlManager.next();
		$scope.trigger('play:change', index)

	})
	$scope.on('click', '.play-btn', function() {
		if(audio.status == 'pause') {
			audio.play();
			audio.status = 'play'
		} else {
			audio.pause();
			audio.status = 'pause'
		}
		audio.status == 'play' ? ($(this).addClass('playing')) : ($(this).removeClass('playing'))
	})
	$scope.on('click', '.list-btn', function() {
		$scope.find('.play-list').addClass('show')
	})
	$scope.on('click', '.close-btn', function() {
		$scope.find('.play-list').removeClass('show')
	})
	$scope.on('click', 'li', function() {
		
		$scope.trigger('play:change', $(this).index())
		$scope.find(".close-btn").trigger('click')

		
	})
	$scope.on('click', '.like-btn', function() {
		$(this).toggleClass('liking')
	})
	$scope.find('.slider-point').on('touchstart', function(e) {
		x1 = e.touches[0].clientX;
		proWid = $scope.find('.pro-bottom').width()
		topWid = $scope.find('.pro-top').width();
	
	}).on('touchmove', function(e2) {

		var x2 = e2.touches[0].clientX;

		var x = topWid + x2 - x1;
		
		x < 0 ? (x = 0) : (x > proWid ? (x = proWid) : (x = topWid + x2 - x1));
		$scope.find('.pro-top').width(x);
		audio.audio.currentTime = x/proWid*audio.audio.duration;
		audio.renderCur(parseInt(audio.audio.currentTime))
	}).on('touchend', function() {
		$('this').off('touchmove');

	})

}