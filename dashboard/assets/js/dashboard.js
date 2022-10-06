
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
let fs = firebase.firestore()
var arrayCows = []

var existCache = localStorage.getItem("saved")

if(existCache == "true"){

  document.getElementById("getData").style = "display:block;"
  document.getElementById("loaderDiv").remove()
  
  document.getElementById("numCows").innerHTML = localStorage.getItem("numCows")
  document.getElementById("locations").innerHTML = localStorage.getItem("locations")
  document.getElementById("numAreas").innerHTML = localStorage.getItem("numAreas")
  document.getElementById("numReports").innerHTML = localStorage.getItem("numReports")

  getDataRT()
  getDataFS()
}else{
  document.getElementById("loaderDiv").style = "display:block;"
  getDataRT()
  getDataFS()
}



function getDataRT(){

  var ctx = 0

 db.ref("cows").once('value', (query) => {

  
  query.forEach(element => {

    ctx++

    db.ref('cows/'+element.key).once('value', (snapshot) => {

      snapshot.forEach(document =>{
  
        if(document.key != "location"){
          arrayCows.push(document.val())
        }
      })
  
    })
    
  });

  document.getElementById("numCows").innerHTML = ctx
  document.getElementById("locations").innerHTML = arrayCows.length

  localStorage.setItem("numCows",ctx)
  localStorage.setItem("locations",arrayCows.length) 
    
 })

}

function getDataFS(){

  let ctx = 0
  let c = 0
  let reports = []
  let eyes = 0
  let skin = 0
  let mov = 0
  let hungry = 0
  let diseases = ["Ojos y ojeras","Piel","Postura y movimiento","Apetito"]
  let data = []
  let dates = []

  fs.collection("area").get().then(snapshot =>{

    snapshot.forEach(element => {
      
      ctx++

    });

  })


  fs.collection("incidents").get().then(snapshot =>{

    snapshot.forEach(element => {
      
      c++
      if(element.data().signs == diseases[0]){
        eyes++
      }else if(element.data().signs == diseases[1]){
        skin++
      }else if(element.data().signs == diseases[2]){
        mov++
      }else if(element.data().signs == diseases[3]){
        hungry++
      }

      dates.push(element.data().date)
    
      //console.log(element.data())

    });

    data = [eyes,skin,mov,hungry]
    var min = Math.min(...dates) 
    var max = Math.max(...dates) 

    radar(data,onlyDateNumber(min),onlyDateNumber(max))

    document.getElementById("numAreas").innerHTML = ctx
    document.getElementById("numReports").innerHTML = c

    localStorage.setItem("numAreas",ctx)
    localStorage.setItem("numReports",c)
    localStorage.setItem("saved","true")

    document.getElementById("getData").style = "display:block;"
    document.getElementById("loaderDiv").remove()

  })

}


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

function radar(values,min,max){

  let diseases = ["Ojos y ojeras","Piel","Postura y movimiento","Apetito"]

  let chartConfig = {
    gui: {
      contextMenu: {
        backgroundColor: '#306EAA', // sets background for entire contextMenu
        button: {
          backgroundColor: '#2D66A4',
          lineColor: '#2D66A4',
          visible: true,
        },
        docked: true,
        gear: {
          alpha: 1,
          backgroundColor: '#2D66A4',
        },
        item: {
          backgroundColor: '#306EAA',
          borderColor: '#306EAA',
          borderWidth: '0px',
          color: '#fff',
          fontFamily: 'Lato',
        },
        position: 'right',
      },
    },
    graphset: [
      {
        type: 'ring',
        backgroundColor: '#FBFCFE',
        title: {
          text: 'Porcentaje de enfermedades',
          fontColor: '#1E5D9E',
          fontFamily: 'Lato',
          fontSize: '14px',
          padding: '15px',
        },
        subtitle: {
          text: min+"   -   "+max,
          fontColor: '#777',
          fontFamily: 'Lato',
          fontSize: '12px',
          padding: '5px',
        },
        legend: {
          adjustLayout: true,
          align: 'center',
          backgroundColor: '#FBFCFE',
          borderWidth: '0px',
          item: {
            cursor: 'pointer',
            fontColor: '#777',
            fontSize: '12px',
            offsetX: '-6px',
          },
          marker: {
            type: 'circle',
            borderWidth: '0px',
            cursor: 'pointer',
            size: 5,
          },
          mediaRules: [
            {
              maxWidth: '500px',
              visible: false,
            },
          ],
          toggleAction: 'remove',
          verticalAlign: 'bottom',
        },
        plot: {
          tooltip: {
            text: '<span style="color:%color">%t</span><br><span style="color:%color">Registros : %v</span>',
            anchor: 'c',
            backgroundColor: 'none',
            borderWidth: '0px',
            fontSize: '16px',
            mediaRules: [
              {
                maxWidth: '500px',
                y: '54%',
              },
            ],
            sticky: true,
            thousandsSeparator: ',',
            x: '50%',
            y: '50%',
          },
          valueBox: [
            {
              type: 'all',
              text: '%t',
              placement: 'out',
            },
            {
              type: 'all',
              text: '%npv%',
              placement: 'in',
            },
          ],
          animation: {
            effect: 'ANIMATION_EXPAND_VERTICAL',
            sequence: 'ANIMATION_BY_PLOT_AND_NODE',
          },
          backgroundColor: '#FBFCFE',
          borderWidth: '0px',
          hoverState: {
            cursor: 'hand',
          },
          slice: '60%',
        },
        plotarea: {
          margin: '70px 0px 10px 0px',
          backgroundColor: 'transparent',
          borderRadius: '10px',
          borderWidth: '0px',
        },
        scaleR: {
          refAngle: 270,
        },
        series: [
          {
            text: diseases[0],
            values: [values[0]],
            backgroundColor: '#00BAF2',
            lineColor: '#00BAF2',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#00BAF2',
            },
          },
          {
            text: diseases[1],
            values: [values[1]],
            backgroundColor: '#E80C60',
            lineColor: '#E80C60',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#E80C60',
            },
          },
          {
            text: diseases[2],
            values: [values[2]],
            backgroundColor: '#9B26AF',
            lineColor: '#9B26AF',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#9B26AF',
            },
          },
          {
            text: diseases[3],
            values: [values[3]],
            backgroundColor: '#5ddb00',
            lineColor: '#5ddb00',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#5ddb00',
            },
          },
        ],
        noData: {
          text: 'No Selection',
          alpha: 0.6,
          backgroundColor: '#20b2db',
          bold: true,
          fontSize: '18px',
          textAlpha: 0.9,
        },
      },
    ],
  };
  
  zingchart.render({
    id: 'radarChart',
    data: chartConfig,
    height: '100%',
    width: '100%',
  });
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

  google.maps.event.addDomListener(window, 'load', init);
