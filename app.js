let clientsInfo = [];

//let url = 'https://gist.githubusercontent.com/QuincyLarson/2ff6892f948d0b7118a99264fd9c1ce8/raw/e9e12f154d71cf77fc32e94e990749a7383ca2d6/Twitch%2520sample%2520API%2520responses%2520in%2520array%2520form';
let url = 'https://gist.githubusercontent.com/AlfCito/2c85279fed67a0d63b26318c1cbec406/raw/10d603372d87ef5d1973a76fe1fe6372ce077747/twitch_API_test.js';

fetch(url).then(res => {
		res.json().then(data =>{

			for( let i = 0; i < data.length-1 ; i++){
				if( data[i].stream !== null ){
					clientsInfo.push({
						'stream' : true,
						'name' : data[i].stream.display_name,
						'logo' : data[i].stream.logo,
						'banner' : data[i].stream.profile_banner,
						'status' : data[i].stream.status,
						'url' : data[i].stream.url,
					})
				}else{
					clientsInfo.push({
						'stream' : false,
						'name' : data[i].display_name,
						'logo' : data[i].logo,
						'banner' : data[i].profile_banner
					})
				}
			}

			return build();

		})	
	});

let build = () => {

		console.log(clientsInfo);

		for( let i = 0; i < clientsInfo.length ; i++){

			if( clientsInfo[i].stream ){
				document.querySelector('#cardsContainer').innerHTML += ""+
				"<a href="+clientsInfo[i].url+" target='_blank'>"+
				"<div class='card'>"+
				"<div class='card-header' style='background-image: url("+ clientsInfo[i].banner +")'>"+
				"<div><h2 class='name'>"+clientsInfo[i].name+"</h2></div>"+
				"<div><img class='logo' src='"+clientsInfo[i].logo+"'></div>"+
				"</div>"+
				"<div class='stream'><h4>Streaming: </h4></div>"+
				"<div class='info'>"+clientsInfo[i].status+"</div>"+
				"</div></a>"
			}else{
				document.querySelector('#cardsContainer').innerHTML += ""+
				"<div class='card offline'>"+
				"<div class='card-header'>"+
				"<div class='card-header-bg' style='background-image: url("+ clientsInfo[i].banner +")'></div>"+
				"<div><h2 class='name'>"+clientsInfo[i].name+"</h2></div>"+
				"<div><img class='logo' src='"+clientsInfo[i].logo+"'></div>"+
				"</div>"+
				"<div><h4>Offline</h4></div>"+
				"</div>"
			}


		}	

	
}

