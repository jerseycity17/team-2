//Google API & Map-related client side code here
var map, GeoMarker;
var markers = [];
var centerPosition;
var defaultZoom;
var infowindow;


function initialize() {
	centerPosition = new google.maps.LatLng(36.072890, -79.791331)
	defaultZoom = 17;
	infowindow = new google.maps.InfoWindow();
	
	var mapOptions = {
	  zoom: defaultZoom,
	  center: centerPosition,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'),
	    mapOptions);
		
	//add custom center button and bed button
	var centerControlDiv = document.createElement('div');
	var centerControl = new CenterControl(centerControlDiv, map);
	centerControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
	
	GeoMarker = new GeolocationMarker();
	GeoMarker.setCircleOptions({fillColor: '#808080'});

	// This function updates the blue dot location when the user's position changes
	google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
	  centerPosition = this.getPosition();
	  map.setCenter(centerPosition);
	  map.fitBounds(this.getBounds());
	});

	// If Google maps can't find user's location, display error message
	google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
	  alert('There was an error obtaining your position. Message: ' + e.message);
	});

	GeoMarker.setMap(map);	// Calling setMap(obj) actually puts the object on the map

	//These lines get bed coordinates from the server side, and render them to the map
	//These lines also add beds to table in bed_view and link them to their position marker
	//var serverURL = 'https://ediblecampusapi-dept-botanicalgarden.cloudapps.unc.edu/beds';
	var serverURL = 'http://localhost:5000/api/locations';
	$.ajax(serverURL, {
		type: 'GET',
		cache: false,
		headers: {
		
		},
		success: function(data, status, jqxhr) {
			//initilize variables
			markers = [];
			var mapZoom = 17;
			
			var loc = window.location.pathname;
			var dir = loc.substring(0, loc.lastIndexOf('/'));
			var icons = {
			  "Food Pantry": '../icons/pantry.png',
			  "Summer Meals": '../icons/summer-meal.png',
			  "Educational Resource": '../icons/school.png',
			  "Free Meal": '../icons/meal.png',
			  "Convenience Store": '../icons/convenience-store.png',
			  "Community Garden": '../icons/garden.png',
			  "BackPack Program": '../icons/backpack.png',
			  "Grocery/Co-Op": '../icons/grocery.png',
			  "CSA Program": '../icons/csa.png',
			  "Mobile Market": '../icons/mobile.png',
			};
			
			
			console.log(data);
			data.forEach(function(d) {
				var location_obj = {}
				//render coordinates
				location_obj["id"] = d[0]
				location_obj["name"] = d[1];
				location_obj["foodSystemElement"] = d[2];
				location_obj["typeOfResource"] = d[3];
				location_obj["website"] = d[4];
				location_obj["contactName"] = d[5];
				location_obj["email"] = d[6];
				location_obj["phone"] = d[7];
				location_obj["address"] = d[8];
				location_obj["city"] = d[9];
				location_obj["state"] = d[10];
				location_obj["zip"] = d[11];
				location_obj["daysOfOperation"] = d[12];
				location_obj["hoursOfOperation"] = d[13];
				location_obj["provider"] = d[14];
				location_obj["comments"] = d[15];
				location_obj["ebt"] = d[16];
				location_obj["lat"] = parseFloat(d[17]);
				location_obj["lng"] = parseFloat(d[18]);
				console.log(location_obj["name"] + ", " + location_obj["typeOfResource"]);
				
				var lat = location_obj["lat"];
				var lng = location_obj["lng"];
				if(location_obj["lat"] && location_obj["lng"]){
					console.log(location_obj["lat"],location_obj["lng"]);
					console.log(lat + " " + lng + " (types: " + (typeof lat) + ", " + (typeof lng) + ")")
					//location =  new google.maps.LatLng(location_obj["lat"],location_obj["lng"]);
				
					var marker = new google.maps.Marker({
						id: location_obj["typeOfResource"]+"_marker"+location_obj["id"],
						position: {lat: lat, lng: lng},
						map: map,
						title: location_obj["name"]
						//icon: icons[location_obj["typeOfResource"]]
					});
					//add to marker list for referencing in click events
					markers.push(marker);

					//zoom into marker on click and open infoWindow
					google.maps.event.addListener(marker, 'click', function() {
						var num = this.id.substr(this.id.length -1);
						map.setZoom(mapZoom);
						map.panTo(this.getPosition());
						getInfoWindowEvent(marker, location_obj);
					});
					/*
					var location = new google.maps.LatLng(latitude, longitude);
					var marker = new google.maps.Marker({
						id: "marker"+i,
						position: location,
						map: map,
						title: bedName
					});
					markers.push(marker);
					google.maps.event.addListener(marker, 'click', function() {
						map.setZoom(mapZoom);
						map.panTo(this.getPosition());
					});
					console.log(bedName);
					//render table
					*/
				}				
				
				
			});
			
			$('#search').keyup(function() {
				var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
				
				markers.forEach(function(m) {
					var text = m.title.replace(/\s+/g, ' ').toLowerCase();
					var type = m.id.split('_')[0].toLowerCase();
					console.log(type);
					m.setVisible(true);
					if(!~text.indexOf(val) && !~type.indexOf(val)){
						m.setVisible(false);
					}
				})
			});
			
		},
		error: function(jqxhr, status, data) {
			console.log(jqxhr.reponseText);
		}
	});
}


function getInfoWindowEvent(marker, l) {
    infowindow.close()
	infowindowContentString = '<div><p>'+ l['name'] +'</p>';
	if(l["website"]){
		infowindowContentString += '<a href="'+l['website'] +'">Website</a> <br/>';
	}
	if(l["phone"]){
		infowindowContentString += l['phone'] +' <br/>';
	}	
	if(l["email"]){
		infowindowContentString += l['email'] +' <br/>';
	}
	if(l["address"]){
		infowindowContentString += l['address'] +', '+ l['city'] +', '+ l['state'] +' <br/>';
	}
	infowindowContentString += '<a href="https://www.google.com/maps/?q='+l['lat']+','+l['lng']+'">Open in Google Maps</a></p><div>';
    infowindow.setContent(infowindowContentString);
    infowindow.open(map, marker);
}

function CenterControl(controlDiv, map) {

	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 1px 4px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginTop = '10px';
	controlUI.style.marginRight = '10px';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to recenter the map';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '11x';
	controlText.style.lineHeight = '25px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = 'Center Map';
	controlUI.appendChild(controlText);

	// Setup the click event listeners: simply set the map to Chicago.
	controlUI.addEventListener('click', function() {
		//infowindow.close();
		map.panTo(centerPosition);
		map.setZoom(defaultZoom);
	});

}

$(document).ready(function () {
	google.maps.event.addDomListener(window, 'load', initialize);
	console.log("We made it to document ready functions");
	if(!navigator.geolocation) {
		alert('Your browser does not support geolocation');
	}
});