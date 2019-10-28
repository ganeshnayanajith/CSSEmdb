import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import FirebaseDB from "../../Firebase";
import Swal from "sweetalert";
import select from 'react-select'

const itemUnitOptions = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'},
];

class SupplierUpdateItemPage extends Component {


    constructor(props) {
        super(props);

        this.suppliersRef = "";

        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onChangeItemUnit = this.onChangeItemUnit.bind(this);
        this.onChangeItemUnitPrice = this.onChangeItemUnitPrice.bind(this);
        this.onChangeItemPaymentType = this.onChangeItemPaymentType.bind(this);

        this.onClickBack = this.onClickBack.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            itemName: '',
            itemUnit: 'Select Unit',
            itemUnitPrice: '',
            itemPaymentType: 'Select Type',
            supplierId: '',
            itemId: ''
        }
    }

    componentDidMount() {

        let currentUrl = window.location.href;
        let supplierId = (currentUrl.split('/')[4]);
        let itemId = (currentUrl.split('/')[5]);
        console.log(currentUrl);
        console.log(supplierId);
        console.log(itemId);
        this.setState({
            supplierId: supplierId,
            itemId:itemId
        });


        this.suppliersRef = FirebaseDB.database().ref('Suppliers/' + supplierId+'/items/'+itemId);
        this.suppliersRef.on('value', (snapshot) => {


            console.log(snapshot.val());
            var item = snapshot.val();

            this.setState({

                itemName: item.itemName,
                itemUnit: item.itemUnit,
                itemUnitPrice:item.itemUnitPrice,
                itemPaymentType: item.itemPaymentType
            });

        });
    }

    onChangeItemName(e) {
        this.setState({
            itemName: e.target.value
        });
    }

    onChangeItemUnit(e) {
        console.log(e.target.value);
        this.setState({
            itemUnit: e.target.value
        });
    }

    onChangeItemUnitPrice(e) {
        this.setState({
            itemUnitPrice: e.target.value
        });
    }

    onChangeItemPaymentType(e) {
        console.log(e.target.value);
        this.setState({
            itemPaymentType: e.target.value
        });
    }

    onClickBack(e){
        this.props.history.push("/supplierviewitems/"+this.state.supplierId);
    }

    onSubmit(e) {


        console.log("itemName : " + this.state.itemName + '\n' +
            "itemUnit : " + this.state.itemUnit + '\n' +
            "itemUnitPrice : " + this.state.itemUnitPrice + '\n' +
            "itemPaymentType : " + this.state.itemPaymentType + '\n'
        );


        const item = {
            itemName: this.state.itemName,
            itemUnit: this.state.itemUnit,
            itemUnitPrice: this.state.itemUnitPrice,
            itemPaymentType: this.state.itemPaymentType
        };

        if (this.state.itemName !== '' && this.state.itemName !== null) {
            if (this.state.itemUnit !== '' && this.state.itemUnit !== null) {
                if (this.state.itemUnitPrice !== '' && this.state.itemUnitPrice !== null) {
                    if (this.state.itemPaymentType !== '' && this.state.itemPaymentType !== null) {



                        this.suppliersRef.update({
                            itemName: this.state.itemName,
                            itemUnit: this.state.itemUnit,
                            itemUnitPrice: this.state.itemUnitPrice,
                            itemPaymentType: this.state.itemPaymentType
                        })
                            .then(response => {
                                console.log(response);

                                this.setState({
                                    itemName: '',
                                    itemUnit: '',
                                    itemUnitPrice: '',
                                    itemPaymentType: ''
                                });

                                Swal("Success !", "Item Updated Successfully !", "success");
                                this.props.history.push("/supplierviewitems/" +this.state.supplierId);

                            })
                            .catch(error => {
                                console.log(error);
                            });


                    } else {
                        Swal("Failed !", "Select Payment Type", "error");
                    }
                } else {
                    Swal("Failed !", "Enter Item Price", "error");
                }
            } else {
                Swal("Failed !", "Select Item unit", "error");
            }
        } else {
            Swal("Failed !", "Enter Item Name", "error");
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
                                    <p className="h4 text-center mb-4">Update Item</p>
                                    <label className="grey-text">
                                        item Name
                                    </label>
                                    <input
                                        value={this.state.itemName}
                                        onChange={this.onChangeItemName}
                                        type="text"
                                        id="itemName"
                                        className="form-control"
                                    />
                                    <br/>
                                    <label className="grey-text">
                                        Item Unit
                                    </label>
                                    <select
                                        value={this.state.itemUnit}
                                        onChange={this.onChangeItemUnit}
                                        id="itemUnit"
                                        className="form-control"
                                    >
                                        <option value="none">Select Unit</option>
                                        <option value="cubic">Cubic</option>
                                        <option value="piece">Piece</option>
                                    </select>
                                    <br/>
                                    <label className="grey-text">
                                        Unit Price
                                    </label>
                                    <input
                                        value={this.state.itemUnitPrice}
                                        onChange={this.onChangeItemUnitPrice}
                                        type="number"
                                        id="itemUnitPrice"
                                        className="form-control"
                                    />
                                    <br/>
                                    <label className="grey-text">
                                        Payment Type
                                    </label>
                                    <select
                                        value={this.state.itemPaymentType}
                                        onChange={this.onChangeItemPaymentType}
                                        id="itemPaymentType"
                                        className="form-control"
                                    >
                                        <option value="none">Select Type</option>
                                        <option value="buy">Buy</option>
                                        <option value="rent">Rent</option>
                                    </select>
                                    <div className="text-center mt-4">
                                        <MDBBtn color="indigo" type="button" onClick={this.onSubmit}>Update
                                            Item</MDBBtn>
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


export default SupplierUpdateItemPage;