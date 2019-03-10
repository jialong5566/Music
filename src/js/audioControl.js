(function($,root){
    var $scope = $(document.body);
    var proWid=$scope.find('.pro-bottom').width();
    var cur,dur,updateWid;
    function audioManager(){
        this.audio = new Audio();
        this.status = "pause";
        // this.bindEvent();
    }  
    audioManager.prototype = {
        //绑定监听歌曲是否播放完成事件
        renderCur:function (cur){
		$scope.find(".cur-time").text(('0'+Math.floor(cur/60)).slice(-2)+':'+('0'+Math.floor(cur%60)).slice(-2));
	    },
        bindEvent:function(){
            $(this.audio).on("ended",function(){
                $scope.find(".next-btn").trigger("click");
            }) 
            var that= this;
            $(this.audio).on("timeupdate",function(){
            	cur = $(that.audio)[0].currentTime;
            	dur = $(that.audio)[0].duration;
            	
            	
            	updateWid = Math.floor((cur/dur)*parseInt(proWid));
            	
            	$scope.find(".pro-top").css('width',updateWid)
                that.renderCur(cur)
//				console.log($(this))
            })  
        },
        play : function(){
            this.audio.play();
            this.status = "play";
            this.bindEvent();
        },
        pause : function(){
            this.audio.pause();
            this.status = "pause";
        },
        setAudioSource : function(src){
            this.audio.src = src;
            this.audio.load();
        },
        jumpToplay : function(time){
            
            this.audio.currentTime = time;
            this.play();

        }
        
    }
    root.audioManager = audioManager;
})(window.Zepto,window.player || (window.player ={}))
