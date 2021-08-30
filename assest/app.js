var playlist = document.querySelector('.playlist');
var header_song = document.querySelector('header h2');
var cd_thumb = document.querySelector('.cd-thumb');
var btn_toggle_play = document.querySelector('.btn-toggle-play');
var player =document.querySelector('.player');
var audio =document.querySelector('#audio');
var progress = document.querySelector('#progress');
var btn_repeat = document.querySelector('.btn-repeat');
var btn_pre = document.querySelector('.btn-prev');
var btn_next = document.querySelector('.btn-next');
var btn_random = document.querySelector('.btn-random');
var progress_color =document.querySelector('.progress_color');



var app = {
    songs: [
        {
            name: "Peach",
            singer: "Justin Bieber",
            path: "assest/audio/song-1.mp3",
            image: "assest/img/img-1.jpg",
        },
        {
            name: "Someone to you",
            singer: "Fasetia ft. Shalom Margaret",
            path: "assest/audio/song-3.mp3",
            image: "assest/img/img-2.jpg",
        },
        {
            name: "At my Worst",
            singer: "Pink Sweat$",
            path: "assest/audio/song-2.mp3",
            image: "assest/img/img-3.jpg",
        },
        {
            name: "Take you dancing",
            singer: "Jason Derulo",
            path: "assest/audio/song-5.mp3",
            image: "assest/img/img-4.jpg",
        },
        {
            name: "Take me to the church",
            singer: "Hozier",
            path: "assest/audio/song-4.mp3",
            image: "assest/img/img-5.jpg",
        },
        {
            name: "Dancing with your Ghost",
            singer: "Sasha Saloan",
            path: "assest/audio/song-6.mp3",
            image: "assest/img/img-6.jpg",
        },
       
    ],

    render: function(){
        var html='';
        this.songs.forEach(function(song){
            html+= `
            <div class="song">
            <div class="thumb"
               style="background-image: url(${song.image})">
               </div>
            <div class="body">
               <h3 class="title">${song.name}</h3>
               <p class="author">${song.singer}</p>
               </div>
            <div class="option">
               <i class="fas fa-ellipsis-h"></i>
               </div>
           </div>
               `
        })
        playlist.innerHTML = html;    
    },
    // definePropert: function(){
    //     Object.defineProperty(app,'currentSong',{
    //         get : function(){
    //             return this.songs[0];
    //         }
    //     })
    // },
    
    currentSong: 0,


    renderCurrentSong: function(currentSong){
        header_song.innerHTML = `${this.songs[currentSong].name} - ${this.songs[currentSong].singer}`;
        cd_thumb.style.background = `url(${this.songs[currentSong].image})`;
        audio.src = this.songs[currentSong].path;
    } ,
    
    handleEvent: function(){
        var _this = this;
       
        var animate_cd = cd_thumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 8000,
            iterations: Infinity,
        })

        animate_cd.pause();

        btn_toggle_play.onclick = function(){
            player.classList.toggle('playing');
            if(player.classList.contains('playing')){
                audio.play();
                animate_cd.play();
            }
            else{
                audio.pause();
                animate_cd.pause();
            }
        }



        audio.ontimeupdate = function(){
            if(this.currentTime != this.duration){
                progress.value = Math.round((this.currentTime/this.duration)*100);  
                progress_color.style.width = progress.value + '%';
            }
            else{
                if(btn_random.classList.contains('active')){
                    var preSong = _this.currentSong;
                    _this.currentSong = Math.floor(Math.random()*_this.songs.length);
                    if(_this.currentSong == preSong){
                        _this.currentSong +=2;
                    }
                }
                else if(!btn_repeat.classList.contains('active')){
                    _this.currentSong++;
                }

                if(_this.currentSong >= _this.songs.length){
                    _this.currentSong = 0;
                }
                _this.renderCurrentSong(_this.currentSong);
                audio.play();
               
            }
              
        };

        progress.oninput = function(){
            audio.currentTime = (this.value*audio.duration)/100;
        }

        btn_repeat.onclick = function(){
            btn_repeat.classList.toggle('active');
            if(btn_repeat.classList.contains('active')){
                audio.loop = true;
            }
            else{
                audio.loop = false;
            }
        }

        btn_pre.onclick = function(){
            _this.currentSong--;
            if(_this.currentSong < 0){
                _this.currentSong = _this.songs.length -1;
            }
            _this.renderCurrentSong(_this.currentSong);
            audio.play();
        }
        btn_next.onclick = function(){
            _this.currentSong++;
            if(_this.currentSong >= _this.songs.length){
                _this.currentSong = 0;
            }
            _this.renderCurrentSong(_this.currentSong);
            audio.play();
        }

        audio.onplay = function(){
            player.classList.add('playing');
            animate_cd.play();
            for(let i =0 ;i < playList.length;i++){
                if(playList[i].classList.contains('active')){
                    playList[i].classList.remove('active');
                }
            }
            var positionSong = (playList[_this.currentSong].offsetHeight)*(_this.currentSong ); 
            window.scrollTo(0,positionSong);
            playList[_this.currentSong].classList.add('active');
        }

        btn_random.onclick = function(){
            btn_random.classList.toggle('active');
        }


        Array.prototype.forEach.call(playList,function(song,index){         
            song.onclick = function() {
                _this.currentSong = index ; 
                _this.renderCurrentSong(_this.currentSong);
                audio.play();
            }
        })
    }
}


app.render();
// app.definePropert();
app.renderCurrentSong(app.currentSong);
var playList= document.querySelectorAll('.playlist .song');
app.handleEvent();

