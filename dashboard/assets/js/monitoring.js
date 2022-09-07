
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
let db = firebase.database();
let db2 = firebase.firestore();
var markers = []

var sign = "Apetito"

    $("#signs").on("change", function () {
        var select = document.getElementById('signs');
        var value = select.options[select.selectedIndex].text;
        sign = value
      });

showCows()

function showCows(){


        window.onload = function () {
            LoadMap();
        }


        function LoadMap() {

            db.ref('cows').on('value', (snapshot) => {
                markers = []
                snapshot.forEach((childSnapshot) => {
                    var location = childSnapshot.val().location
                    var lat = location.latitude
                    var lng = location.longitude
                    var time = location.time
                    var gender = location.gender
                    var obj = {title:childSnapshot.key,lat:lat,lng:lng,description:time,gender:gender}
                    markers.push(obj)
                });
        
                var mapOptions = {
                    center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
                    zoom: 14,
                    mapTypeId: 'terrain'
                };
                var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

                db2.collection("area").get().then(snapshot =>{
 
                    snapshot.forEach(query => {
                
                      // Construct the polygon.
                      const polygon = new google.maps.Polygon({
                        paths: query.data().shapes,
                        strokeWeight: 1,
                        fillColor: "#FFFFFF",
                        fillOpacity: .01,  //This changes throughout the program      
                        strokeColor: '#000000',
                        
                      });
                      
                      polygon.setMap(map);
                          
                    });
                  })
        
                //Create and open InfoWindow.
                var infoWindow = new google.maps.InfoWindow();
                var iconBase = {
                    url : '../imgs/icon-cow.png',
                    scaledSize: new google.maps.Size(50, 50)
                }

                var iconBase2 = {
                    url : '../imgs/icon-cow-male.png',
                    scaledSize: new google.maps.Size(50, 50)
                }
         
                for (var i = 0; i < markers.length; i++) {
                    var data = markers[i];
                    var marker 
                    var myLatlng = new google.maps.LatLng(data.lat, data.lng);
                    if(data.gender == "male"){
                        marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            icon: iconBase2,
                            title: data.description
                        });
                    }else{
                        marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            icon: iconBase,
                            title: data.description
                        });
                    }
               
         
                    //Attach click event to the marker.
                    (function (marker, data) {
                        google.maps.event.addListener(marker, "click", function (e) {
                            var str = data.title
                            var num_cow = str.split("cow")
                            //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                            infoWindow.setContent(
                                '<div style = "width:200px;min-height:15px">' 
                                +'<label>'+'<strong>Vaca N°'+num_cow[1]+'</strong>'+'</label>'
                                +'</div>'+
                                '<div style = "width:200px;min-height:15px">' 
                                +'<label><strong>Fecha : </strong>'+ data.description +'</label>'
                                +'</div>'+

                                '<div style = "width:200px;min-height:15px;margin-top:8px;">' 
                                +'<center><button class="btnOptionConfig animate__animated animate__bounceIn" style="font-size:10px;" onclick="reportCow('+"'"+data.gender+","+data.title+","+data.lat+","+data.lng+"'"+')">Reportar</button></center>'
                                +'</div>'
                                );
                            infoWindow.open(map, marker);
                        });
                    })(marker, data);
                }

            });
        }    
}



function reportCow(data){

    var array = data.split(",")
    var cow = array[1].split("cow")

    MicroModal.show("modal-report")
    document.getElementById("modal-title").innerHTML = "Reportar Vaca N°"+cow[1]

    if(array[0] == "female"){
        document.getElementById("gender").innerHTML = "Hembra"
        document.getElementById("gender").style = "font-weight:bold;color:#FA276A;"
        document.getElementById("img-gender").src = "../imgs/icon-cow.png"
    }else{
        document.getElementById("gender").innerHTML = "Macho"
        document.getElementById("gender").style = "font-weight:bold;color:#0262AD;"
        document.getElementById("img-gender").src = "../imgs/icon-cow-male.png"
    }
  
    document.getElementById("latitude").innerHTML = array[2]
    document.getElementById("longitude").innerHTML = array[3]
    document.getElementById("date").innerHTML = onlyDateNumber(Date.now())+" - "+onlyHour(Date.now())


}

function xd(){
    alert(sign)
}

function onlyDateNumber(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();

      if(date <=9){
        date = "0"+date
      }
    var time = date + '/' + month + '/' + year;
    return time;
  }

  function onlyHour(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();

    var stringhour = hour
    var stringmin = min
    var stringseg = sec

    if(hour <=9){
      stringhour = "0"+hour
   }
    if(min <=9){
       stringmin = "0"+min
    }
    if(sec <=9){
      stringseg = "0"+sec
    }

    var time = stringhour + ':' + stringmin ;

    return time;
  }