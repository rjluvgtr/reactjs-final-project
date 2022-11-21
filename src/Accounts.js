import React from 'react';
import {Redirect} from 'react-router-dom';
export default class Account extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:JSON.parse(localStorage.getItem('adminPanelData')).accountsPage,
            switch:true,
            loginStatus:JSON.parse(localStorage.getItem('loginStatus')),
            updatedData:JSON.parse(localStorage.getItem('AccountsData')),
            seletedDropDown:'',
            uploadedImgObj:'',
        }
        this.form=React.createRef();
        this.profilePic=React.createRef();
    }
    uploadNewPhoto=(e)=>{
        // alert(e)
        document.getElementById('uploadFile').click();
        
    }
    updateTheData=()=>{
        let temp=this.state.seletedDropDown,data=this.state.updatedData
        console.log(data[temp]);
        data[temp].name=this.form.current[0].value
        data[temp].email=this.form.current[1].value
        data[temp].password=this.form.current[2].value
        data[temp].phone=this.form.current[4].value
        data[temp].profilePic=this.profilePic.current.src
        this.setState({updatedData:data})
        localStorage.setItem('AccountsData',JSON.stringify(this.state.updatedData));
        alert('updated your Account ')


    }
    uploadClick=(e)=>{
        if(e.target.files[0].size>1048576){
            alert('upload failed, file is too big');
            return
        }
        this.profilePic.current.src=URL.createObjectURL(e.target.files[0]);
        this.setState({uploadedImgObj:e})
        console.log(this.profilePic.current.src);
        alert('upload successfully');
    }
        dropDownClick=(e)=>{
        let a=e.target.options.selectedIndex,newData,temp
        if(a==1){
            newData=this.state.updatedData.Admin
            temp='Admin'
        }else if(a==2){
            newData=this.state.updatedData.Editor
            temp='Editor'
        }else if(a==3){
            newData=this.state.updatedData.Merchant
            temp='Merchant'
        }else if(a==4){
            newData=this.state.updatedData.Customer
            temp='Customer'
        }
        this.form.current[0].value=newData.name
        this.form.current[1].value=newData.email
        this.form.current[2].value=newData.password
        this.form.current[3].value=newData.password
        this.form.current[4].value=newData.phone
        this.profilePic.current.src=newData.profilePic
        this.profilePic.current.alt='profile pic '


        this.setState({seletedDropDown:temp})
    }
    render() {
        if(this.state.loginStatus!=true){
            // alert('need to login  ')
            this.setState({loginStatus:true})
            return <Redirect to='/Loginpage'/>

        }
        if(this.state.updatedData==undefined){
            this.setState({updatedData:this.state.data})
        }
        return <div className="page-container">
                <div className='table--container'>
                    <div >
                        <div className='container--title'>List of Accounts</div>
                        <div >
                            <div className='Input--wrapper'>
                                <label for='Accounts'>Accounts</label><br/>
                                <select onChange={(e)=>this.dropDownClick(e)} className="Input--wrapper" id="category">
                                    <option selected="">Select category</option>
                                    <option value="1">Admin</option>
                                    <option value="2">Editor</option>
                                    <option value="3">Merchant</option>
                                    <option value="4">Customer</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='containers--wrapper'>
                    <div className='smallContainer'>
                        <div className='container--title'>Change Avatar</div>
                        <div >
                            <div className='Input--wrapper'>
                                <div className="Account-img-container">
                                    <img src='https://templatemo.com/templates/templatemo_524_product_admin/img/avatar.png' alt="Avatar" ref={this.profilePic} className="Account-img"/>
                                    <a href="#" className="product-delete-link delete-img-icon">
                                    <i className="far fa-trash-alt"></i>
                                    </a>
                                </div>
                                <div className='btn' id='UploadNewPhoto' onClick={()=>this.uploadNewPhoto('UploadNewPhoto')}>UPLOAD NEW PHOTO</div>
                                <input type='file' id='uploadFile' onChange={(e)=>this.uploadClick(e)} style={{display:'none'}}/>
                            </div>
                        </div>
                    </div>
                    <div className='rightContainer'>
                        <div className='container--title'>Account Settings</div>
                        <form ref={this.form}>
                            <div className='containers--wrapper'>
                                <div className='Input--wrapper--container' >
                                    <div className='Input--wrapper'>
                                        <label for='AccountName'>Account Name</label><br/>
                                        <input id='AccountName' type='text' required/>
                                    </div>
                                </div>
                                <div className='Input--wrapper--container' >
                                    <div className='Input--wrapper'>
                                        <label for='AccountEmail'>Account Email</label><br/>
                                        <input id='AccountEmail' type='text' required/>
                                    </div>
                                </div>
                            </div>
                               
                            <div className='containers--wrapper'>
                                <div className='Input--wrapper--container'>
                                    <div className='Input--wrapper'>
                                        <label for='AccountPassword'>Password</label><br/>
                                        <input id='AccountPassword' type='password' required/>
                                    </div>
                                </div>
                                <div className='Input--wrapper--container'>
                                    <div className='Input--wrapper'>
                                        <label for='AccountRe-Password'>Re-enter Password</label><br/>
                                        <input id='AccountRe-Password' type='password' required/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='containers--wrapper'>
                                <div className='Input--wrapper--container'>
                                    <div className='Input--wrapper'>
                                        <label for='AccountPhone'>Phone</label><br/>
                                        <input id='AccountPhone' type='text' required/>
                                    </div>
                                </div>
                                <div className='Input--wrapper--container'>
                                    <div className='Input--wrapper'>
                                        <label for='Accounts' style={{'visibility':'hidden'}}>UPDATE YOUR PROFILE</label><br/>
                                        <div className='btn' onClick={this.updateTheData}>UPDATE YOUR PROFILE</div>
                                        {/* <input id='Accounts' type='text' required/> */}
                                    </div>
                                </div>
                            </div>

                            <button type='submit' className='btn'>DELETE YOUR ACCOUNT </button>
                        </form>
                    </div>
                </div>
        </div>
    }
}