
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
  var incidents = []

  allIncidents()

  function allIncidents(){

    db.collection("incidents").onSnapshot((snapshot) => {

        var ctx = 0

        incidents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        $("#tbody").html(
            incidents
              .map((file) => {
                ctx++
                $("#cowsSpinner").hide();
                return `
                  <tr>
                    <td class="dnirow" scope='row' style='padding: 20px'>
                      ${ctx}
                    </td>
                    <td>
                    ${onlyDateNumber(file.date)}
                    </td>
                    <td>
                    ${onlyHour(file.date)}
                    </td>
                    <td>
                    <div class="div-typeuser"> 
                    ${file.user}
                    </div>
                    </td>
                    <td>
                    ${"Vaca N°"+file.cow}</b>
                    </td>
                      <td>
                    <button 
                    class="btnOptionConfig animate__animated animate__bounceIn"
                    onclick="setData('${file.cow}', '${file.date}', '${file.description}', '${file.gender}', '${file.lat}', '${file.lng}', '${file.user}')">
                    <ion-icon name="eye-outline" size="large"></ion-icon>
                      </button>
                    </td>
                  </tr>`;
              })
              .join("")
          );
       
    })

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

  function setData(cow, date, description, gender, lat , lng , user) {
    MicroModal.show("modal-1");
    $("#edni").val(dni);
    $("#ename").val(name);
    $("#ephone").val(phone);
    edit_dni_user = dni;
    edit_name_user = name;
    edit_phone = phone;
    edit_id_user = id;
    edit_type_user = type;
  }