import React from 'react';
import {Redirect} from 'react-router-dom';
import './Loginpage.css'
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loginStatus:JSON.parse(localStorage.getItem('loginStatus'))
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        if(e.target[0].value==e.target[1].value){
            localStorage.setItem('loginStatus',JSON.stringify(true))
            this.setState({loginStatus:true})
            return
        }
        alert('Incorrect, \n username and password should same ')
        console.log('user name ',e.target[0].value);
        console.log('password ',e.target[1].value);
        localStorage.setItem('loginStatus',JSON.stringify(false))
        this.setState({loginStatus:false})

    }
    render(){
        if(this.state.loginStatus==true){
            return <Redirect to='/'/>
        }
        return <div className="page-container">
            <div className="loginPanel--container">
                <div className='loginPanel'>
                    <div className='loginPanel--title'> Welcome to Dashboard, Login</div>
                    <form onSubmit={(e)=>this.handleSubmit(e)}>
                        <div>
                            <div className='Input--wrapper'>
                                <label for='userName'>Username</label><br/>
                                <input id='userName' type='text' required/>
                            </div>
                            <div className='Input--wrapper' required>
                                <label for='Password'>Password</label><br/>
                                <input id='Password' type='password'/>
                            </div>
                            <div >
                                <input type='submit'  className='btn' value='LOGIN'/>
                                <div className='btn forgot-btn'>FORGOT YOUR PASSWORD ?</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>}
}