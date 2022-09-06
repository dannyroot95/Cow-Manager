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
let db = firebase.firestore();

var map; // Global declaration of the map
var drawingManager
var shapes = []  
var vertices = ""
var idDeleteArea = ""

function showArea(){
  MicroModal.show("modal-area")
}

function deleteArea(){
  document.getElementById("shapes").innerHTML = ''
  MicroModal.show("delete-area")
  db.collection("area").get().then(snapshot =>{
    var ctx = 0
    var area = '<option value="'+0+'">Seleccione un área...</option>'
    $(area).appendTo('#shapes');
    snapshot.forEach(document =>{
      ctx++
      var area = '<option value="'+ctx+'">'+document.data().label+'</option>'
      $(area).appendTo('#shapes');
    })
  })
}

function initialize() {
  
  var myLatlng = new google.maps.LatLng(-12.5746489620646, -69.16789782379598);

  var myOptions = {
    zoom: 13,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYGON]
    },
    polygonOptions: {
      editable: true
    }
  });
  drawingManager.setMap(map);


 
google.maps.event.addListener(drawingManager, "overlaycomplete", function(event) {
    overlayClickListener(event.overlay);
    vertices = event.overlay.getPath().getArray().toString()
    drawingManager.setMap(null)    
  });
}


function overlayClickListener(overlay) {
  google.maps.event.addListener(overlay, "mouseout", function(event) {
    shapes = []
    vertices = ""
    vertices = overlay.getPath().getArray().toString()
  });
}


  
  function deleteMarkers() {
    shapes = []
    vertices = ""
    var myLatlng = new google.maps.LatLng(-12.5746489620646, -69.16789782379598);
    var myOptions = {
        zoom: 13,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
      drawingManager.setMap(map);
  }

 

  function saveArea(){ 

    var label = document.getElementById("label").value

    if(vertices != ""){

      if(label != ""){

        var splitter = vertices.split(")")

    
      for(var i = 0 ; i<splitter.length; i++){
  
        var v1 = splitter[i].replaceAll("(","")
        
  
        if(i > 0 ){
          var v2 = v1.replaceAll(" ","")
          var del = v2.slice(1, -1)
          var v3= del.split(",")
          var lat = parseFloat(v3[0])
          var lgn = parseFloat(v3[1])
          shapes.push({lat:lat,lng:lgn})
        }else{
          var v2 = v1.replaceAll(" ","")
          var v3= v2.split(",")
          var lat = parseFloat(v3[0])
          var lgn = parseFloat(v3[1])
          shapes.push({lat:lat,lng:lgn})
        }
        
      }
  
      shapes.pop()
      saveToDatabase(shapes,label)
      vertices = ""
      init()

      }else{
        alert("Ingrese un nombre al area!")
      }
      
    }else{
      alert("Agregue un area!")
    }
 
  }

function init() {

  var infowindow = new google.maps.InfoWindow({
    size: new google.maps.Size(150, 50)
  });

  db.collection("area").get().then(snapshot =>{

    const map = new google.maps.Map(document.getElementById("mapa"), {
      zoom: 14,
      center: { lat: -12.5746489620646, lng: -69.16789782379598 },
      mapTypeId: "terrain",
    });

    snapshot.forEach(query => {

      // Construct the polygon.
      const polygon = new google.maps.Polygon({
        paths: query.data().shapes,
        strokeColor: "#5bbd00",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#5bbd00",
        fillOpacity: 0.35,
      });

      google.maps.event.addListener(polygon, "mouseover", function(event) {   
        infowindow.setContent("<br>"+query.data().label+"<br>");
        infowindow.setPosition(event.latLng);
        infowindow.open(map);
      });
    
      polygon.setMap(map);
          
    });
  })
}

$("#shapes").on("change", function () {
  var select = document.getElementById('shapes');
  var value = select.options[select.selectedIndex].text;
  areaDelete = value
  selectArea(value)
});

function selectArea(label) {
  
  db.collection("area").where("label", "==", label).get().then(snapshot =>{

    const map = new google.maps.Map(document.getElementById("map-canvas-2"), {
      zoom: 13,
      center: { lat: -12.5746489620646, lng: -69.16789782379598 },
      mapTypeId: "terrain",
    });

    snapshot.forEach(query => {

      // Construct the polygon.
      const polygon = new google.maps.Polygon({
        paths: query.data().shapes,
        strokeColor: "#5bbd00",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#5bbd00",
        fillOpacity: 0.35,
      });

      idDeleteArea = query.id

      polygon.setMap(map);

    })

  })
}

function deleteAreaFromDB(){
 db.collection("area").doc(idDeleteArea).delete().then(() =>{
  idDeleteArea = ""
  MicroModal.close("delete-area")
  init()
  alert("Eliminado")
 }).catch((error) => {
  console.error("Error : ", error);
});

}

function saveToDatabase(shapes,label){
  db.collection("area").add({shapes,label:label}).then(snap =>{
    alert("guardado")
    deleteMarkers()
  })
}

google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, 'load', init);
google.maps.event.addDomListener(window, 'load', selectArea(null));

