Function.prototype.extend = function( fn ){
	for( var attr in fn.prototype ){
		this.prototype[attr] = fn.prototype[attr];
	}
}
//共有属性
function Paly(name){
	this.name = name;
	this.point = 0;
}
//共有属方法
Paly.prototype.guess = function(){}
//玩家的构造函数
function User( name ){
	Paly.call( this , name );
}
User.extend(Paly);
//玩家的猜拳方法
User.prototype.guess = function( point ){
	return this.point = point;
}
//电脑的构造函数
function Computer( name ){
	Paly.call( this , name );
}
Computer.extend(Paly);
//电脑的猜拳方法，随机
Computer.prototype.guess = function(){
	return this.point = Math.floor( Math.random()*3 );
}
var user = new User( '张磊' );
var comp = new Computer( '刘焕文' );
//裁判
function Game( u , c ){
	this.classN = document.getElementsByClassName('name');
	this.text = document.getElementById("text");
	this.Guess = document.getElementById("guess");
	this.anim = document.getElementsByClassName('anim');
	this.tiemr = null;
	this.num = 0;
	this.user = u;
	this.comp = c;
	this.init();
}
//初始化名字
Game.prototype.init = function(){
	this.classN[0].innerHTML = '我：'+ this.user.name;
	this.classN[1].innerHTML = '我：'+ this.comp.name;
}	
//开始玩
Game.prototype.play = function(){
	this.start();
	this.textValue( '请出拳……' );
	this.toggleDisable();
	this.Guess.style.display = 'block';
}
//怎么玩
Game.prototype.start = function(){
	var This = this;
	this.tiemr = setInterval(function(){
		This.anim[0].className = 'anim user guess' + ( ( This.num ++ ) % 3 );
		This.anim[1].className = 'anim comp guess' + ( ( This.num ++ ) % 3 );
	},500);
}
//让按钮失效于可选
Game.prototype.toggleDisable = function(){
	var oBtn = document.getElementById("play");
	if(oBtn.disabled){
		oBtn.disabled = false;
		oBtn.className = '';
		oBtn.innerHTML = '再来一次';
	}else{
		oBtn.disabled = true;
		oBtn.className = 'disabled';
	}
}
//提示面板区域的修改
Game.prototype.textValue = function( val ){
	this.text.innerHTML = val;
}
//裁判的裁决功能
Game.prototype.verdict = function( point ){
	clearInterval( this.tiemr );
	var userGu = user.guess(point);
	var compGu = comp.guess();
	this.anim[0].className = 'anim user guess' + userGu;
	this.anim[1].className = 'anim comp guess' + compGu;
	var res = userGu - compGu;
	switch( res ){
		case 0:
		this.textValue('平局！！！！！');
		break;
		case 1:
		case -2:
		this.textValue('555555~~我输了！');
		break;
		case -1:
		case 2:
		this.textValue('yeah~我赢啦！');
		break;
	};
	this.Guess.style.display = 'none';
	this.toggleDisable();
};
var game = new Game( user , comp );