import React from 'react';
import {BrowserRouter,Route,Switch,Link,Redirect} from 'react-router-dom'
// import { Chart, registerables } from 'chart.js';
import {Line,Bar,Pie} from 'react-chartjs-2'
export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:JSON.parse(localStorage.getItem('adminPanelData')),
            loginStatus:JSON.parse(localStorage.getItem('loginStatus')),
            backgroundColor: [
                'rgba(127, 255, 212, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                            ],
            borderColor: [
                'rgba(127, 255, 212, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                        ],

        }
    }
    lineChart=(data)=>{
        // console.log(data.featured);
        let result=[],c=0;
        for(let i in data){
            if(i=='months'){continue}
            let temp={
                    label: `${i}`,
                    data: data[`${i}`],
                    borderColor:[`${this.state.borderColor[c]}`],
                    backgroundColor:[`${this.state.backgroundColor[c]}`],
                    borderWidth: 2,
                    pointRadius:0
            }
            result.push(temp);
            c+=1;
        }
        return result;
    }
    msgHighlite=(msg)=>{
        let temp=msg.split(' '),temp2='Jessica Oliver Too Victoria 6 others',temp3=' product updates. order'
        return <>{temp.map((item)=>{
            if(temp2.includes(item)){   return <b> {item} </b>
            }else if(temp3.includes(item)){ return <a href='#' className='updateLink'> {item}</a>
            }else{  return <> {item} </>    }
        })}</>
    }

    render() {

        if(this.state.loginStatus!=true){
            // alert(this.loginStatus)
            this.setState({loginStatus:true})
            return <Redirect to='/Loginpage'/>
        }
        if(this.state.data==undefined){
            return <></>
        }
        console.log('data in dashbord',this.state.data);
        let lineChartDataset=this.lineChart(this.state.data.dasbhoardPage.latestHits)
        let notifications=this.state.data.dasbhoardPage.notifications
        let orders=this.state.data.dasbhoardPage.orders;
        // console.log(orders);
        let barChartDataset=this.state.data.dasbhoardPage.performance;
        let pieChartDataset=this.state.data.dasbhoardPage.storage;
        return <div className="page-container">
                <div className='container--title'>Welcome back,<b>Admin</b></div>
                <div className='containers--wrapper'>
                    <div className='table--container Input--wrapper--container'>
                        <label className='containers--subtitle'>Latest Hits</label><br/>
                        <div className='charts'>
                            <Line
                            data={{
                                labels: this.state.data.dasbhoardPage.latestHits.months,
                                datasets:lineChartDataset
                            }}
                            options={{ 
                                    indexAxis:'x',
                                    plugins: {legend: {labels: {font: {size: 10,},color: '#fff'},}},
                                    maintainAspectRatio: false,
                                    tension:0.3,
                                    scales: {x:{
                                            ticks:{color:'#ffff'},
                                            // title:{color:'#ffff',display:false,text:'Hits'}
                                        },y:{
                                            ticks:{color:'#ffff'},
                                            title:{color:'#ffff',display:true,text:'Hits'}
                                        },
                                    },}}
                            /> 
                        </div>
                    </div>
                    <div className='table--container Input--wrapper--container'>
                        <label className='containers--subtitle'>Performance</label><br/>
                        <div className='charts'>
                            <Bar
                            data={{
                                labels: Object.keys(barChartDataset),
                                datasets:[{
                                    data:Object.values(barChartDataset),
                                    label:'# of Hits',
                                    borderColor:this.state.borderColor,
                                    backgroundColor:this.state.borderColor,
                                    // borderWidth: 4,
                                    barThickness:2,
                                }],
                            }}
                            options={{ 
                                    indexAxis:'y',
                                    plugins: {legend: {labels: {font: {size: 10,},color: '#fff'},}},
                                    maintainAspectRatio: false,
                                    tension:0.3,
                                    scales: {x:{
                                            ticks:{color:'#ffff'},
                                            // title:{color:'#ffff',display:false,text:'Hits'}
                                        },y:{
                                            ticks:{color:'#ffff'},
                                            title:{color:'#ffff',display:true,text:'Hits'}
                                        },
                                        width:1
                                    },}}
                            /> 
                        </div>
                    </div>
                </div>
                <div className='containers--wrapper'>
                    <div className='table--container Input--wrapper--container'>
                        <label className='containers--subtitle'>Storage Information</label><br/>
                        <div className='PieChart'>
                            <Pie
                            data={{
                                labels: Object.keys(pieChartDataset),
                                datasets:[{
                                    data:Object.values(pieChartDataset),
                                    label:'# of Hits',
                                    borderColor:this.state.borderColor,
                                    // borderColor:bgcolor1.splice(3),
                                    backgroundColor:this.state.borderColor,
                                    // backgroundColor:bgcolor2.splice(3),
                                    // borderWidth: 4,
                                    barThickness:2,
                                }],
                            }}
                            options={{ 
                                    indexAxis:'y',
                                    plugins: {legend: {labels: {font: {size: 10,},color: '#fff'},}},
                                    maintainAspectRatio: false,
                                }}
                            /> 
                        </div>
                    </div>
                    <div className='table--container Input--wrapper--container'>
                        <label className='containers--subtitle'>Notification List</label><br/>
                        <div className='table'>
                            <table class="table--content">
                                <tbody className='notificaton--body'>
                                    {notifications.map((item)=>{
                                            return <><tr className='notification--tr'>
                                                        <td className='notifications-container'>
                                                            <div className='notification-img'><img src={`${item.pic}`} alt='pic ' /></div>
                                                            <div className='notification-content'>
                                                                <div className='notigication-msg'><p>{this.msgHighlite(item.message)}</p></div>
                                                                <div className='notigication-time'>{item.time}</div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>})
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='table--container'>
                    <label className='container--title'>Orders List</label><br/>
                    <div className='dashbord-table'>
                        <div className='table-content'>
                            <table className='table--content'>
                                <thead>
                                    <tr>
                                        <th>ORDER NO.</th>
                                        <th>STATUS</th>
                                        <th>OPERATORS</th>
                                        <th>LOCATION</th>
                                        <th>DISTANCE</th>
                                        <th>START DATE</th>
                                        <th>EST DELIVERY  DUE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((item)=>{
                                       return <tr className='dashbord--tr'>
                                            <td>#{item.orderNo}</td>
                                            <td><span className={`orderStatus ${item.status}`}></span>{item.status}</td>	
                                            <td>{item.operators}</td>	
                                            <td>{item.location}</td>	
                                            <td>{item.distance} km</td>	
                                            <td>{item.startDate}</td>	
                                            <td>{item.deliveryDate}</td>
                                        </tr>
                                    })}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    }
}





 