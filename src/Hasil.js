import React, { Component } from 'react';
import firebase from "firebase";
var Highcharts = require('highcharts'); 



class Hasil extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: [],
          cahaya:[],
          suhu:[]
        }
      }
      componentDidMount(){
        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Monthly Average Temperature'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
                name: 'Cahaya',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'Suhu',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        });
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
  //var tempSuhu=[];
  
  this.setState({data:data,suhu:tempSuhu});
});
console.log(this.state.data);
      }
    render() { 
        const { data,suhu } = this.state;
        
        console.log(suhu);
          return (
           <div> 
                <div id="container"></div>
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