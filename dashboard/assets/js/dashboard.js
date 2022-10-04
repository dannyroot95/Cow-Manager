
var firebaseConfig = {
    apiKey: "AIzaSyC1rPBlZGVhDoca5IRkQYMOPsEJU_lKi5Q",
    authDomain: "cowiot.firebaseapp.com",
    databaseURL: "https://cowiot-default-rtdb.firebaseio.com",
    projectId: "cowiot",
    storageBucket: "cowiot.appspot.com",
    messagingSenderId: "359413020575",
    appId: "1:359413020575:web:2e64e053c12b4794d1afaa"
  };
  
firebase.initializeApp(firebaseConfig);
let db = firebase.database()


function init(){

    var latitude 
    var longitude
    var reference = JSON.parse(localStorage.getItem("reference"));
    if (reference != null && reference != "" && reference != undefined) {
        latitude = reference.lat
        longitude = reference.lng
    }else{
        latitude = -12.591497
        longitude = -69.1978477
    }    

var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 17,
    styles: [{
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]  // PARA ENCERDER PUNTOS DE INTERES.
    }, {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }]  // PARA MOSTRAR LOS ELEMENTOS DEL MAPA DE GOOGLE MAPS NATIVO.
    }],
    disableDoubleClickZoom: true // ZOOM
  });

//FUNCION PARA DIBUJAR UN PUNTO DE CALOR EN EL MAPA (HEATMAP)
var heatmap = new google.maps.visualization.HeatmapLayer({
  data: [],
  map: map,
  radius: 24
});

db.ref("cows").on('child_added',
 function(snapshot) {

   var cow = snapshot.key

   db.ref("cows/"+cow).on('child_added',
   function(child) {

    child.forEach(data => {

        if(child.key != "location"){
            
            var point = new google.maps.LatLng(child.val().latitude, child.val().longitude);
            heatmap.getData().push(point);
           }
        
       });

   })
});
}


  google.maps.event.addDomListener(window, 'load', init);
