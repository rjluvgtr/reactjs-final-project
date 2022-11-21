import React from "react";
import {Link} from "react-router-dom";
import './Navbar.css'
export default class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loginStatus:JSON.parse(sessionStorage.getItem('loginStatus'))
        }
        this.Dashboard = React.createRef();
        this.Products = React.createRef();
        this.Accounts = React.createRef();
        this.LoginOut = React.createRef();
        this.dropDown = React.createRef();
    }
    portalClick(e){
        if(e=='logout'){
            this.LoginOut.current.className='login'
            localStorage.setItem('loginStatus',false)
            return
        }
        this.LoginOut.current.className='logout'
        this.Dashboard.current.className='unactive'
        this.Products.current.className='unactive'
        this.Accounts.current.className='unactive'
        if(this.Dashboard.current.id==e){
            this.Dashboard.current.className='active'
        }else if(this.Products.current.id==e){
            this.Products.current.className='active'
        }else if(this.Accounts.current.id==e){
            this.Accounts.current.className='active'
        }
    }
    menuClick=()=>{
        if(this.dropDown.current.style.display!='flex'){
            this.dropDown.current.style.display='flex'
        }
        else{
            this.dropDown.current.style.display='none'
        }
    }
    render(){
        
        return <nav className='Navbar--container' >
            <ul className='navbar--wrapper'>
                <div><Link to='/' className='logo'>PRODUCT ADMIN</Link></div>
                <div className='topbar--menu' onClick={this.menuClick}><i class="fas fa-bars menubar"></i></div>
                <span className='dropDownMenu' ref={this.dropDown}  >
                    <li className='main--portals--wrapper'>
                        <ul className='page-portals--wrapper'>
                        <Link to='/'> <li className='unactive' id='Dashboard' ref={this.Dashboard} onClick={()=>this.portalClick('Dashboard')}><i className="fas fa-tachometer-alt"></i> <br/> Dashboard</li></Link>
                            <li className='unactive' id='Reports' onClick={()=>this.portalClick('Reports')}><i className="far fa-file-alt"></i> <br/> Reports</li>
                            <Link to='/Product'><li className='unactive' id='Products' ref={this.Products} onClick={()=>this.portalClick('Products')}><i className="fas fa-shopping-cart"></i> <br/> Products</li></Link>
                            <Link to='/Account'><li className='unactive' id='Accounts' ref={this.Accounts} onClick={()=>this.portalClick('Accounts')}><i className="far fa-user"></i> <br/> Accounts</li></Link>
                            <li className='unactive' id='Settings' onClick={()=>this.portalClick('Settings')}><i className="fas fa-cog"></i> <br/> Settings</li>
                        </ul>
                    </li>
                    <li className='logout--wrapper'><Link to='/Loginpage' ref={this.LoginOut} className='logout' id='logout' onClick={()=>this.portalClick('logout')}> Admin, Logout</Link><br/></li>
                </span>
            </ul>
        </nav>
    }
}
