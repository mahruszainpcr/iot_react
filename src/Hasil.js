import React, { Component } from 'react';
import firebase from "firebase";



class Hasil extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: [],
          cahaya:[],
          suhu:[]
        }
      }
      timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }
      grafik(dataSuhu,atributSuhu){
        
var Highcharts = require('highcharts'); 
        Highcharts.chart('container', {
          chart: {
              type: 'line'
          },
          title: {
              text: 'Data Suhu Ruangan 327'
          },
          subtitle: {
              text: 'Source: WorldClimate.com'
          },
          xAxis: {
              categories: atributSuhu
          },
          yAxis: {
              title: {
                  text: 'Temperature (°C)'
              }
          },
          plotOptions: {
              line: {
                  dataLabels: {
                      enabled: true
                  },
                  enableMouseTracking: false
              }
          },
          series: [{
              name: 'Suhu Ruang 327',
              data:dataSuhu
          }]
      });
      }
      grafik2(dataSuhu,atributSuhu){
        
        var Highcharts = require('highcharts'); 
                Highcharts.chart('container2', {
                  chart: {
                      type: 'line'
                  },
                  title: {
                      text: 'Data Cahaya Ruangan 327'
                  },
                  subtitle: {
                      text: 'Source: WorldClimate.com'
                  },
                  xAxis: {
                      categories: atributSuhu
                  },
                  yAxis: {
                      title: {
                          text: 'Temperature (°C)'
                      }
                  },
                  plotOptions: {
                      line: {
                          dataLabels: {
                              enabled: true
                          },
                          enableMouseTracking: false
                      }
                  },
                  series: [{
                      name: 'Cahaya Ruang 327',
                      data:dataSuhu
                  }]
              });
              }
      componentDidMount(){
        
        const firebaseApp = firebase.initializeApp({
            apiKey: "AIzaSyC2pcBmWbJioki-Hio0VqMzYxS9YWftYWE",
            authDomain: "aua-iot.firebaseapp.com",
            databaseURL: "https://aua-iot.firebaseio.com",
            projectId: "aua-iot",
            storageBucket: "aua-iot.appspot.com",
            messagingSenderId: "909989541623",
            appId: "1:909989541623:web:aac8114c63aaa98ecd05f2",
            measurementId: "G-49L54E403V"
          });
          
          const db = firebaseApp.firestore();
          
        db.collection("pcr")
.get()
.then(querySnapshot => {
  const data = querySnapshot.docs.map(doc => doc.data());
  this.setState({data:data});
  var suhuTemp=[];
  var atributSuhu=[];
  var cahayaTemp=[];
  var atributCahaya=[];
        for(var i = 0; i < data.length; i++){
          // console.log(this.timeConverter(data[i].timestamp));
          if(data[i].topic=="r327/suhu"){
            suhuTemp.push(parseInt(data[i].msg));
            atributSuhu.push(this.timeConverter(data[i].timestamp));
          }
          if(data[i].topic=="r327/cahaya"){
            cahayaTemp.push(parseInt(data[i].msg));
            atributCahaya.push(this.timeConverter(data[i].timestamp));
          }
        }
        this.grafik(suhuTemp,atributSuhu);
        this.grafik2(cahayaTemp,atributCahaya);
        // suhu.setState(suhuTemp);
        
});
// console.log(this.state.data);
      }
    render() { 
        const { data,suhu } = this.state;
        
        
          return (
           <div> 
                <div id="container"></div>
                <div id="container2"></div>
               <ul>
              {data.map(item => (
                <li key={item.msg}>
                  {item.msg} {item.topic}
                </li>
              ))}
            </ul>
            </div>
          );
        
    }
}
 
export default Hasil;