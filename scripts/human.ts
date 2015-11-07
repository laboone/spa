class Human {
	name: string;
	
	constructor (yourHumanName:string ){
		this.name = yourHumanName;
	}
	
	callHuman = function(){
		console.log('hello ' + this.name);
		console.log('hoge');
		console.log('piyo');
	}
}