'use strict'

let clientsInfo = [];
let streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "RobotCaleb", "noobs2ninjas"];

let getData = () => {

	let urls = [];

	for(let i = 0; i < streamers.length; i++){
	
		let urlConstructor = "https://wind-bow.glitch.me/twitch-api/channels/"+streamers[i];
		urls.push(urlConstructor);		
	}

	Promise.all(urls.map(url =>
	    fetch(url).then(resp => resp.json())
	)).then(urlData => {

		urlData.map((value, index) => {

			clientsInfo.push({
				'name' : value.display_name,
				'logo' : value.logo,
				'banner' : value.profile_banner,
				'status' : value.status,
				'url' : value.url,
			})
		});

		getStream();

	});
}

let getStream = () => {

	let urls = [];

	for(let i = 0; i < streamers.length; i++){
	
		let urlConstructor = "https://wind-bow.glitch.me/twitch-api/streams/"+streamers[i];
		urls.push(urlConstructor);
		
	}

	Promise.all(urls.map(url =>
	    fetch(url).then(resp => resp.json())
	)).then(urlData => {

		urlData.map((value, index) => {

			let isStreaming;

			if( value.stream ){
				isStreaming = true;
			}else{
				isStreaming = false;
			}


			clientsInfo[index].stream = isStreaming;
			
		});

		return build();

	});	
}

let build = () => {

	for( let i = 0; i < clientsInfo.length ; i++){

		if( clientsInfo[i].stream ){
			document.querySelector('#cardsContainer').innerHTML += ""+
			"<a href="+clientsInfo[i].url+" target='_blank'>"+
			"<div class='card online show'>"+
			"<div class='card-header' style='background-image: url("+ clientsInfo[i].banner +")'>"+
			"<div><h2 class='name'>"+clientsInfo[i].name+"</h2></div>"+
			"<div><img class='logo' src='"+clientsInfo[i].logo+"'></div>"+
			"</div>"+
			"<div class='stream'><h4>Streaming: </h4></div>"+
			"<div class='info'>"+clientsInfo[i].status+"</div>"+
			"</div></a>"
		}else{
			document.querySelector('#cardsContainer').innerHTML += ""+
			"<a href="+clientsInfo[i].url+" target='_blank'>"+
			"<div class='card offline show'>"+
			"<div class='card-header'>"+
			"<div class='card-header-bg' style='background-image: url("+ clientsInfo[i].banner +")'></div>"+
			"<div><h2 class='name'>"+clientsInfo[i].name+"</h2></div>"+
			"<div><img class='logo' src='"+clientsInfo[i].logo+"'></div>"+
			"</div>"+
			"<div><h4>Offline</h4></div>"+
			"</div></a>"
		}
	}


	document.querySelector('#btn-offline').addEventListener("click", () => {

		var offlineCards = document.getElementsByClassName('offline');
	    for (let i = 0; i < offlineCards.length; i++) {
	    	offlineCards[i].classList.add('show');
	    }

		var onlineCards = document.getElementsByClassName('online');
	    for (let i = 0; i < onlineCards.length; i++) {
	        onlineCards[i].classList.add('hide');
	        onlineCards[i].classList.remove('show');
	    }

	});

	document.querySelector('#btn-online').addEventListener("click", () => {

		var onlineCards = document.getElementsByClassName('online');
	    for (let i = 0; i < onlineCards.length; i++) {
	        onlineCards[i].classList.add('show');
	    }

	    var offlineCards = document.getElementsByClassName('offline');
	    for (let i = 0; i < offlineCards.length; i++) {
	    	offlineCards[i].classList.add('hide');
	        offlineCards[i].classList.remove('show');
	    }

	});

	document.querySelector('#btn-all').addEventListener("click", () => {

		var onlineCards = document.getElementsByClassName('online');
	    for (let i = 0; i < onlineCards.length; i++) {
	        onlineCards[i].classList.add('show');
	        onlineCards[i].classList.remove('hide');
	    }

	    var offlineCards = document.getElementsByClassName('offline');
	    for (let i = 0; i < offlineCards.length; i++) {
	        offlineCards[i].classList.add('show');
	        offlineCards[i].classList.remove('hide');
	    }
	});
}

getData();


