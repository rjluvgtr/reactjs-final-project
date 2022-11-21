import React from 'react';
import {BrowserRouter,Route,Switch,Link,Redirect} from 'react-router-dom'
export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:JSON.parse(localStorage.getItem('adminPanelData')).productsPage,
            selectedRows:[],
            addNewProduct:false,
            deletedRows:[],
            newRows:[],
            loginStatus:JSON.parse(localStorage.getItem('loginStatus')),
            selectedCategories:[],
            addCategory:[]
        }
        this.productImg=React.createRef();
    }
    addNewCategory=()=>{
        let a=window.prompt('Enter new category :  ','');
        if(a!=''){
            // alert(a)
            this.setState({addCategory:[...this.state.addCategory,a]})
        }
    }
    categoriesDelete=(index)=>{
        this.setState({selectedCategories:[...this.state.selectedCategories,index]})
    }
    uploadNewPhoto=(e)=>{
    // alert(e)
    document.getElementById('uploadFile').click();
    }
    uploadClick=(e)=>{
        if(e.target.files[0].size>1048576){
            alert('upload failed, file is too big');
            return
        }
        this.productImg.current.src=URL.createObjectURL(e.target.files[0]);
        alert('upload successfully');
    }
    deleteButton=(index)=>{
        this.setState({deletedRows:[...this.state.deletedRows,index]})
    }
    deleteSelectedRows=()=>{
        this.setState({deletedRows:this.state.selectedRows})
    }
    addNewProduct=()=>{
        this.setState({addNewProduct:!this.state.addNewProduct})
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let temp={
            category:e.target[2].value,
            description:e.target[1].value,
            expireDate:e.target[3].value,
            name:e.target[0].value,
            stock:e.target[4].value,
            unitSold:'---'
        }
        this.setState({newRows:temp})
        if(e.target[6].value==''){

           if( window.confirm('product imgage is not uploaded ')){
               this.addNewProduct();
            // alert('')
           }
        }
    }
    rowClicked=(index)=>{
        let temp=this.state.selectedRows
        if(temp.includes(index)){   
            temp.splice(temp.indexOf(index),1)
            this.setState({selectedRows:temp})
            console.log('temp after ===  ',temp);
            return
        }
        this.setState({selectedRows:[...temp,index]})
    }
    render() {
        if(this.state.loginStatus!=true){
            this.setState({loginStatus:true})
            return <Redirect to='/Loginpage'/>
        }
        const data=this.state.data,activeRows=this.state.selectedRows;
        let productData=[...data.products]
        if(this.state.newRows.length!=0){
            productData=[this.state.newRows,...productData]
        }    
        let categorieData=[...data.categories]
        if(this.state.addCategory.length!=0){
            categorieData=[this.state.addCategory,...categorieData]

        }    

        return <div className="page-container">
            {!this.state.addNewProduct && <div className="tables--wrapper">

                <div className='table--container table1'>
                    <div className="table">
                        <table className="table--content">
                            <thead>
                                <tr>
                                    <th className="col">&nbsp;</th>
                                    <th className="col">PRODUCT NAME</th>
                                    <th className="col">UNIT SOLD</th>
                                    <th className="col">IN STOCK</th>
                                    <th className="col">EXPIRE DATE</th>
                                    <th className="col">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productData.map((item,index)=>{
                                        if(!this.state.deletedRows.includes(index))
                                        {
                                        return <tr className='product--list--tr' key={index} onClick={()=>this.rowClicked(index)}>
                                                    <th className="row"><input type="checkbox" className={(activeRows.includes(index)?'clicked':'unclicked')}/></th>
                                                    <td className="tm-product-name">{item.name}</td>
                                                    <td>{item.unitSold}</td>
                                                    <td>{item.stock}</td>
                                                    <td>{item.expireDate}</td>
                                                    <td>
                                                    <a href="#" className="product-delete-link" onClick={()=>this.deleteButton(index)}>
                                                        <i className="far fa-trash-alt"></i>
                                                    </a>
                                                    </td>
                                                </tr>
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className='btn' onClick={this.addNewProduct}>ADD NEW PRODUCT </div>

                    <div className='btn' onClick={this.deleteSelectedRows}> DELETE SELETED PRODUCTS</div>
                </div>
                
                <div className='table--container table2'>
                        <p >Product Categories</p>
                    <div className='table'>
                        <table className="table--content">
                            <tbody>
                                {
                                    categorieData.map((item,index)=>(!this.state.selectedCategories.includes(index) && <tr className='product--list--tr' key={index}>
                                                                    <td className="product-Category-name">{item}</td>
                                                                    <td >
                                                                    <a href="#" className="product-delete-link" onClick={()=>this.categoriesDelete(index)}>
                                                                        <i className="far fa-trash-alt"></i>
                                                                    </a>
                                                                    </td>
                                                                </tr>))
                                }
                                
                            </tbody>
                        </table>
                    </div>
                    <div className='btn' onClick={()=>{this.addNewCategory()}}>ADD NEW CATEGORIE</div>
                </div>

            </div>}
            {this.state.addNewProduct && <div className='addProduct--container'>
                 <form  onSubmit={(e)=>{this.handleSubmit(e)}}>
                <div className='Input--wrapper'>
                    <div className='container--title'>Add Product</div>
                    <div className='containers--wrapper'>
                       
                            <div className='Input--wrapper--container'>
                                <div>
                                    <label for='ProductName'>ProductName</label><br/>
                                    <input className='Input--wrapper' id='ProductName' type='text' required/>
                                </div>
                                <div>
                                    <label for='Description'>Description</label><br/>
                                    <textarea className='Input--wrapper' id='Description' />
                                </div>
                                <div>
                                    <label for='category'>Category</label><br/>
                                    <select className="Input--wrapper" id="category" required>
                                        <option selected="">Select category</option>
                                        <option value="1">New Arrival</option>
                                        <option value="2">Most Popular</option>
                                        <option value="3">Trending</option>
                                    </select>
                                    {/* <input className='Input--wrapper' id='Accounts' type='text' required/> */}
                                </div >
                                <div className='containers--wrapper'>
                                    <div className='Input--wrapper--container'>
                                        <label for='ExpireDate'>Expire Date</label><br/>
                                        <input id="ExpireDate" name="ExpireDate" type="text" class="Input--wrapper" data-large-mode="true" required/>
                                        {/* <input className='Input--wrapper' id='ExpireDate' type='text' required/> */}
                                    </div>
                                    <div className='Input--wrapper--container'>
                                        <label for='UnitsInStock'>Units In Stock</label><br/>
                                        <input className='Input--wrapper' id='UnitsInStock' type='text' required/>
                                    </div>
                                </div>
                            </div>
                       
                        <div className='Input--wrapper--container'>
                            <div className="addProduct--uploadPic" onClick={()=>this.uploadNewPhoto('UploadNewPhoto')}>
                                <img src='' ref={this.productImg} className="Account-img productImg"/>
                                <i className="fas fa-cloud-upload-alt"></i>
                            </div>
                            <button className='btn' id='UploadNewPhoto' onClick={()=>this.uploadNewPhoto('UploadNewPhoto')}> UPLOAD PRODUCT IMAGE</button>
                            <input type='file' id='uploadFile' onChange={(e)=>this.uploadClick(e)} style={{display:'none'}} />

                        </div>
                    </div>
                </div>
                <input type='submit' className='btn' value=' ADD PRODUCT NOW'/>   
                </form>  
             </div>}
             
        </div>
    }
}
// {data.products.map((item)=><h3>{item.name}</h3>)}
