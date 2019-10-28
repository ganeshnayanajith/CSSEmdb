import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import FirebaseDB from "../../Firebase";
import Swal from 'sweetalert';
import Checkbox from "@material-ui/core/Checkbox";


class SupplierUpdatePage extends Component {


    constructor(props) {
        super(props);

        this.suppliersRef = "";

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCheckBoxAll = this.onChangeCheckBoxAll.bind(this);
        this.onChangeCheckBoxPaint = this.onChangeCheckBoxPaint.bind(this);
        this.onChangeCheckBoxPipe = this.onChangeCheckBoxPipe.bind(this);
        this.onChangeCheckBoxTool = this.onChangeCheckBoxTool.bind(this);
        this.onChangeCheckBoxConstruction = this.onChangeCheckBoxConstruction.bind(this);

        this.onClickBack = this.onClickBack.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            supplierId: '',
            name: '',
            email: '',
            contact: '',
            address: '',
            categoryAll: false,
            categoryConstruction: false,
            categoryTool: false,
            categoryPipe: false,
            categoryPaint: false,
            categories: []
        }

    }


    componentDidMount() {

        document.title = "Update Supplier";

        let currentUrl = window.location.href;
        let supplierId = (currentUrl.split('/')[4]);
        console.log(currentUrl);
        console.log(supplierId);
        this.setState({
            supplierId: supplierId
        });


        this.suppliersRef = FirebaseDB.database().ref('Suppliers/' + supplierId);
        this.suppliersRef.on('value', (snapshot) => {


            console.log(snapshot.val());
            var supplier = snapshot.val();

            this.setState({
                name: supplier.supplierName,
                email: supplier.supplierEmail,
                contact: supplier.supplierContact,
                address: supplier.supplierAddress,
                categories: []
            });

            console.log(supplier.supplierCategories);

            supplier.supplierCategories.map((currentCategory, i) => {

                if (currentCategory == 'all') {
                    this.setState({
                        categoryAll: true
                    });
                }
                if (currentCategory == 'construction') {
                    this.setState({
                        categoryConstruction: true
                    });
                }
                if (currentCategory == 'tool') {
                    this.setState({
                        categoryTool: true
                    });
                }
                if(currentCategory=='pipe'){
                    this.setState({
                        categoryPipe:true
                    });
                }
                if(currentCategory=='paint'){
                    this.setState({
                        categoryPaint:true
                    });
                }
            });


        });


    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeContact(e) {
        this.setState({
            contact: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onClickBack(e) {
        this.props.history.push("/supplier");
    }

    onChangeCheckBoxAll(e) {
        console.log(e.target.name);
        this.setState({
            categoryAll: !this.state.categoryAll
        });

    }

    onChangeCheckBoxConstruction(e) {
        console.log(e.target.name);
        this.setState({
            categoryConstruction: !this.state.categoryConstruction
        });

    }

    onChangeCheckBoxPipe(e) {
        console.log(e.target.name);
        this.setState({
            categoryPipe: !this.state.categoryPipe
        });

    }

    onChangeCheckBoxTool(e) {
        console.log(e.target.name);
        this.setState({
            categoryTool: !this.state.categoryTool
        });

    }

    onChangeCheckBoxPaint(e) {
        console.log(e.target.name);
        this.setState({
            categoryPaint: !this.state.categoryPaint
        });

    }

    onSubmit(e) {


        console.log("name : " + this.state.name + '\n' +
            "email : " + this.state.email + '\n' +
            "contact : " + this.state.contact + '\n' +
            "address : " + this.state.address + '\n'+
            "all : " + this.state.categoryAll + '\n' +
            "construction : " + this.state.categoryConstruction + '\n' +
            "tool : " + this.state.categoryTool + '\n' +
            "pipe : " + this.state.categoryPipe + '\n' +
            "paint : " + this.state.categoryPaint + '\n'
        );




        if(this.state.categoryAll===true){
            this.setState({
                categories:this.state.categories.push('all')
            });
        }
        if(this.state.categoryConstruction===true){
            this.setState({
                categories:this.state.categories.push('construction')
            });
        }
        if(this.state.categoryTool===true){
            this.setState({
                categories:this.state.categories.push('tool')
            });
        }
        if(this.state.categoryPipe===true){
            this.setState({
                categories:this.state.categories.push('pipe')
            });
        }
        if(this.state.categoryPaint===true){
            this.setState({
                categories:this.state.categories.push('paint')
            });
        }

        if (this.state.name !== '' && this.state.name !== null) {
            if (this.state.email !== '' && this.state.email !== null) {
                if (this.state.contact !== '' && this.state.contact !== null) {
                    if (this.state.address !== '' && this.state.address !== null) {

                        console.log(this.state.categories);


                        this.suppliersRef.update({
                            supplierName: this.state.name,
                            supplierEmail: this.state.email,
                            supplierContact: this.state.contact,
                            supplierAddress: this.state.address,
                            supplierCategories:this.state.categories
                        })
                            .then(response => {
                                console.log(response);

                                this.setState({
                                    name: '',
                                    email: '',
                                    contact: '',
                                    address: '',
                                    categoryAll: false,
                                    categoryConstruction: false,
                                    categoryTool: false,
                                    categoryPipe: false,
                                    categoryPaint: false,
                                    categories: []
                                });

                                Swal("Success !", "Supplier Updated Successfully !", "success");
                                this.props.history.push("/supplier");

                            })
                            .catch(error => {
                                console.log(error);
                            });


                    } else {
                        Swal("Failed !", "Enter Address", "error");
                    }
                } else {
                    Swal("Failed !", "Enter Contact", "error");
                }
            } else {
                Swal("Failed !", "Enter Email", "error");
            }
        } else {
            Swal("Failed !", "Enter Name", "error");
        }
    }


    render() {

        return (

            <MDBContainer fluid>

                <MDBRow>
                    <MDBCol lg="4" className="mb-5">
                        <div className="d-flex justify-content-end float-lg-left">
                            <MDBBtn color="blue" onClick={this.onClickBack}>Back</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>


                <MDBRow>
                    <MDBCol lg="8" className="mb-5">
                        <MDBCard>
                            <MDBCardBody>
                                <form>
                                    <p className="h4 text-center mb-4">Update Supplier</p>
                                    <label className="grey-text">
                                        Full Name
                                    </label>
                                    <input
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        type="text"
                                        id="name"
                                        className="form-control"
                                    />
                                    <br/>
                                    <label className="grey-text">
                                        Email
                                    </label>
                                    <input
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        type="email"
                                        id="email"
                                        className="form-control"
                                    />
                                    <br/>
                                    <label className="grey-text">
                                        Contact
                                    </label>
                                    <input
                                        value={this.state.contact}
                                        onChange={this.onChangeContact}
                                        type="text"
                                        id="contact"
                                        className="form-control"
                                    />
                                    <br/>
                                    <label className="grey-text">
                                        Address
                                    </label>
                                    <input
                                        value={this.state.address}
                                        onChange={this.onChangeAddress}
                                        type="text"
                                        id="address"
                                        className="form-control"
                                    />
                                    <br/>


                                    {/*Categories of supplier*/}

                                    <MDBRow>
                                        <MDBCol lg="2">
                                            <label className="grey-text">
                                                All
                                            </label>
                                            <Checkbox
                                                checked={this.state.categoryAll}
                                                onChange={this.onChangeCheckBoxAll}
                                                name="categoryAll"

                                            />
                                        </MDBCol>
                                        <MDBCol lg="3">
                                            <label className="grey-text">
                                                Construction
                                            </label>
                                            <Checkbox
                                                checked={this.state.categoryConstruction}
                                                onChange={this.onChangeCheckBoxConstruction}
                                                name="categoryConstruction"
                                            />
                                        </MDBCol>
                                        <MDBCol lg="2">
                                            <label className="grey-text">
                                                Tool
                                            </label>
                                            <Checkbox
                                                checked={this.state.categoryTool}
                                                onChange={this.onChangeCheckBoxTool}
                                                name="categoryTool"
                                            />
                                        </MDBCol>
                                        <MDBCol lg="2">
                                            <label className="grey-text">
                                                Pipe
                                            </label>
                                            <Checkbox
                                                checked={this.state.categoryPipe}
                                                onChange={this.onChangeCheckBoxPipe}
                                                name="categoryPipe"
                                            />
                                        </MDBCol>
                                        <MDBCol lg="2">
                                            <label className="grey-text">
                                                Paint
                                            </label>
                                            <Checkbox
                                                checked={this.state.categoryPaint}
                                                onChange={this.onChangeCheckBoxPaint}
                                                name="categoryPaint"
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <div className="text-center mt-4">
                                        <MDBBtn color="indigo" type="button" onClick={this.onSubmit}>Update
                                            Supplier</MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );


    }
};


export default SupplierUpdatePage;