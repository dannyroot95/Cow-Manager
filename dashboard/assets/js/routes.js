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

  db.ref('cows').once('value', (snapshot) => {
    var ctx = 0
    snapshot.forEach(document =>{
      ctx++
      var result = document.key
      var cow = result.split("cow")
      var area = '<option value="'+ctx+'">Vaca N°'+cow[1]+'</option>'
      $(area).appendTo('#cows');
    })

    $("#cows").on("change", function () {
        var select = document.getElementById('cows');
        var value = select.options[select.selectedIndex].text;
       
        var cow = value.split("Vaca N°")

        searchRoutes("cow"+cow[1])

      });

  })

  function searchRoutes(cow){

    var points = []

    db.ref('cows/'+cow).once('value', (snapshot) => {

        snapshot.forEach(document =>{

            if(document.key != "location"){
                var location = document.val()
                points.push({lat:location.latitude,lng:location.longitude})
            }

        })

        console.log(points)

    })

  }

  