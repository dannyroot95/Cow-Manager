
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

  let date = new Date()

  let eyes = 0 , skin = 0 , mov = 0 , hungry = 0

  let diseases = ["Ojos y ojeras","Piel","Postura y movimiento","Apetito"]
  let data = [] , dates = []

  let eyeJan = 0 , eyeFeb = 0 , eyeMar = 0 , eyeApr = 0 , eyeMay = 0 , eyeJun = 0 , eyeJul = 0 , eyeAgu = 0 , eyeSep = 0 , eyeOct = 0 , eyeNov = 0 , eyeDec = 0 

  let skinJan = 0 , skinFeb = 0 , skinMar = 0 , skinApr = 0 , skinMay = 0 , skinJun = 0 , skinJul = 0 , skinAgu = 0 , skinSep = 0 , skinOct = 0 , skinNov = 0 , skinDec = 0 

  let movJan = 0 , movFeb = 0 , movMar = 0 , movApr = 0 , movMay = 0 , movJun = 0 , movJul = 0 , movAgu = 0 , movSep = 0 , movOct = 0 , movNov = 0 , movDec = 0 

  let hungryJan = 0 , hungryFeb = 0 , hungryMar = 0 , hungryApr = 0 , hungryMay = 0 , hungryJun = 0 , hungryJul = 0 , hungryAgu = 0 , hungrySep = 0 , hungryOct = 0 , hungryNov = 0 , hungryDec = 0 

  let januaryX = [toTimestamp(date.getFullYear()+"/01/"+getFirstAndLastDayByMonth(0).firstDay),
  toTimestamp(date.getFullYear()+"/01/"+getFirstAndLastDayByMonth(0).lastDay+" "+"23:59:59")]

  let februaryX = [toTimestamp(date.getFullYear()+"/02/"+getFirstAndLastDayByMonth(1).firstDay),
  toTimestamp(date.getFullYear()+"/02/"+getFirstAndLastDayByMonth(1).lastDay+" "+"23:59:59")]
  
  let marchX = [toTimestamp(date.getFullYear()+"/03/"+getFirstAndLastDayByMonth(2).firstDay),
  toTimestamp(date.getFullYear()+"/03/"+getFirstAndLastDayByMonth(2).lastDay+" "+"23:59:59")]
  
  let aprilX = [toTimestamp(date.getFullYear()+"/04/"+getFirstAndLastDayByMonth(3).firstDay),
  toTimestamp(date.getFullYear()+"/04/"+getFirstAndLastDayByMonth(3).lastDay+" "+"23:59:59")]

  let mayX = [toTimestamp(date.getFullYear()+"/05/"+getFirstAndLastDayByMonth(4).firstDay),
  toTimestamp(date.getFullYear()+"/05/"+getFirstAndLastDayByMonth(4).lastDay+" "+"23:59:59")]

  let juneX = [toTimestamp(date.getFullYear()+"/06/"+getFirstAndLastDayByMonth(5).firstDay),
  toTimestamp(date.getFullYear()+"/06/"+getFirstAndLastDayByMonth(5).lastDay+" "+"23:59:59")]

  let julyX = [toTimestamp(date.getFullYear()+"/07/"+getFirstAndLastDayByMonth(6).firstDay),
  toTimestamp(date.getFullYear()+"/07/"+getFirstAndLastDayByMonth(6).lastDay+" "+"23:59:59")]

  let augustX = [toTimestamp(date.getFullYear()+"/08/"+getFirstAndLastDayByMonth(7).firstDay),
  toTimestamp(date.getFullYear()+"/08/"+getFirstAndLastDayByMonth(7).lastDay+" "+"23:59:59")]

  let septemberX = [toTimestamp(date.getFullYear()+"/09/"+getFirstAndLastDayByMonth(8).firstDay),
  toTimestamp(date.getFullYear()+"/09/"+getFirstAndLastDayByMonth(8).lastDay+" "+"23:59:59")]
  
  let octoberX = [toTimestamp(date.getFullYear()+"/10/"+getFirstAndLastDayByMonth(9).firstDay),
  toTimestamp(date.getFullYear()+"/10/"+getFirstAndLastDayByMonth(9).lastDay+" "+"23:59:59")]

  let novemberX = [toTimestamp(date.getFullYear()+"/11/"+getFirstAndLastDayByMonth(10).firstDay),
  toTimestamp(date.getFullYear()+"/11/"+getFirstAndLastDayByMonth(10).lastDay+" "+"23:59:59")]
  
  let decemberX = [toTimestamp(date.getFullYear()+"/12/"+getFirstAndLastDayByMonth(11).firstDay),
  toTimestamp(date.getFullYear()+"/12/"+getFirstAndLastDayByMonth(11).lastDay+" "+"23:59:59")]

  let eyesX = [] , skinX  = [] , movX = [] , hungryX = []

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

        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          eyeJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          eyeFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          eyeMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          eyeApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          eyeMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          eyeJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          eyeJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          eyeAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          eyeSep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          eyeOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          eyeNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          eyeDec++
        }

      }else if(element.data().signs == diseases[1]){

        skin++

        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          skinJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          skinFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          skinMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          skinApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          skinMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          skinJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          skinJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          skinAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          skinSep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          skinOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          skinNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          skinDec++
        }



      }else if(element.data().signs == diseases[2]){
        mov++

        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          movJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          movFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          movMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          movApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          movMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          movJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          movJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          movAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          movSep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          movOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          movNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          movDec++
        }

      }else if(element.data().signs == diseases[3]){
        hungry++

        
        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          hungryJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          hungryFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          hungryMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          hungryApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          hungryMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          hungryJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          hungryJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          hungryAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          hungrySep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          hungryOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          hungryNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          hungryDec++
        }

      }

      dates.push(element.data().date)
    

    });

    eyesX = [eyeJan,eyeFeb,eyeMar,eyeApr,eyeMay,eyeJun,eyeJul,eyeAgu,eyeSep,eyeOct,eyeNov,eyeDec]
    skinX = [skinJan,skinFeb,skinMar,skinApr,skinMay,skinJun,skinJul,skinAgu,skinSep,skinOct,skinNov,skinDec]
    movX = [movJan,movFeb,movMar,movApr,movMay,movJun,movJul,movAgu,movSep,movOct,movNov,movDec]
    hungryX = [hungryJan,hungryFeb,hungryMar,hungryApr,hungryMay,hungryJun,hungryJul,hungryAgu,hungrySep,hungryOct,hungryNov,hungryDec]

    console.log(movX)

    data = [eyes,skin,mov,hungry]
  
    var min = Math.min(...dates) 
    var max = Math.max(...dates) 

    radar(data,onlyDateNumber(min),onlyDateNumber(max))
    details(eyesX,skinX,movX,hungryX)

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


function getFirstAndLastDayByMonth(value){

let months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]  

var date = new Date();
var primerDia = new Date(date.getFullYear(),value, 1);
var ultimoDia = new Date(date.getFullYear(),value + 1, 0);

var json = {
  
  firstDay : primerDia.getDate(),
  lastDay : ultimoDia.getDate(),
  month : months[value]

}

return json

}


function toTimestamp(strDate){
	var datum = new Date(strDate).getTime();
	return datum;
 }
  

 function details(array1,array2,array3,array4){

  let eyesMax = Math.max(... array1)
  let skinMax = Math.max(... array2)
  let movMax = Math.max(... array3)
  let hungryMax = Math.max(... array4)

  
  let eyesMin = Math.min(... array1)
  let skinMin = Math.min(... array2)
  let movMin = Math.min(... array3)
  let hungryMin = Math.min(... array4)
  let mins = [eyesMin,skinMin,movMin,hungryMin]
 
  let maxValue = eyesMax+skinMax+movMax+hungryMax
  let minValue = Math.min(... mins)


  let chartConfig = {
    type: 'area',
    theme: 'classic',
    backgroundColor: '#fff',
    title: {
      text: 'Analisis comparativo - 2022',
      backgroundColor: 'none',
      fontFamily: 'Lato',
      fontColor: '#000',
      fontSize: '20px',
      fontWeight: 'normal',
      textAlign: 'left',
    },
    legend: {
      align: 'center',
      backgroundColor: '#145A32',
      borderColor: '#808080',
      fontFamily: 'Lato',
      fontSize: '10px',
      item: {
        fontColor: '#ffffff',
        markerStyle: 'match',
      },
      layout: 'float',
      margin: '5% auto auto auto',
      toggleAction: 'remove',
    },
    plot: {
      tooltip: {
        visible: false,
      },
      tooltipText: '%t: %v',
      activeArea: true,
      animation: {
        delay: 500,
        effect: 'ANIMATION_EXPAND_BOTTOM',
        speed: 600,
      },
      shadow: false,
      stacked: true,
    },
    plotarea: {
      margin: '10% 8% 14% 12%',
    },
    scaleX: {
      values: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      guide: {
        lineColor: '#808080',
        lineStyle: 'solid',
      },
      item: {
        fontColor: '#808080',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: 'normal',
        offsetY: '5%',
      },
      lineColor: '#808080',
      lineStyle: 'solid',
      lineWidth: '1px',
      tick: {
        lineColor: '#808080',
        lineWidth: '1px',
      },
    },
    scaleY: {
      values: '0:'+maxValue+'+:'+minValue+'',
      format: '%v R',
      guide: {
        alpha: 0.1,
        lineColor: '#808080',
        lineStyle: 'solid',
      },
      item: {
        fontColor: '#808080',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: 'normal',
        offsetX: '-5%',
      },
      lineColor: '#808080',
      lineWidth: '1px',
      tick: {
        lineColor: '#808080',
        lineWidth: '1px',
      },
    },
    crosshairX: {
      lineColor: '#FFFFFF',
      lineWidth: '2px',
      marker: {
        visible: false,
      },
      offsetY: '10%',
      plotLabel: {
        text: '<strong>%t</strong>: %v Registros',
        fontColor: '#000000',
        fontFamily: 'Lato',
      },
      scaleLabel: {
        offsetY: '5%',
      },
    },
  
    series: [
      {
        text: 'Ojos y ojera',
        values: array1,
        backgroundColor: '#8DD62E',
        lineColor: '#8DD62E',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#8DD62E',
          borderColor: '#8DD62E',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'Piel',
        values: array2,
        backgroundColor: '#FF006F',
        lineColor: '#FF006F',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#FF006F',
          borderColor: '#FF006F',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'Postura y movimiento',
        values: array3,
        backgroundColor: '#00D3E6',
        lineColor: '#00D3E6',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#00D3E6',
          borderColor: '#00D3E6',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'Apetito',
        values: array4,
        backgroundColor: '#FFD540',
        lineColor: '#FFD540',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#FFD540',
          borderColor: '#FFD540',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
    ],
  };
  
  zingchart.render({
    id: 'dashChart',
    data: chartConfig,
    height: '100%',
    width: '100%',
  });
}


  google.maps.event.addDomListener(window, 'load', init);
