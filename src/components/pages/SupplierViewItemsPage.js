import React from 'react'
import {MDBCard, MDBCol, MDBRow, MDBCardBody, MDBBtn, MDBDataTable, MDBContainer, MDBIcon} from 'mdbreact';
import FirebaseDB from "../../Firebase";
import Swal from "sweetalert";

class SupplierViewItemsPage extends React.Component {

    constructor(props) {
        super(props);

        this.suppliersRef = "";

        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.onClickBack = this.onClickBack.bind(this);

        this.state = {
            supplierId: '',
            supplierName: '',
            data: [],
            rows: [],
            columns: [
                {
                    label: 'Item Name',
                    field: 'itemName'
                },
                {
                    label: 'Item Unit',
                    field: 'itemUnit'
                },
                {
                    label: 'Unit Price',
                    field: 'itemUnitPrice'
                },
                {
                    label: 'Payment Type',
                    field: 'itemPaymentType'
                },
                {
                    label: 'Update',
                    field: 'update'
                },
                {
                    label: 'Delete',
                    field: 'delete'
                }

            ]

        }

    }//end of constructor


    componentDidMount() {
        document.title = "Items";

        let currentUrl = window.location.href;
        let supplierId = (currentUrl.split('/')[4]);
        console.log(currentUrl);
        console.log(supplierId);
        this.setState({
            supplierId: supplierId
        });

        this.supplierRef = FirebaseDB.database().ref('Suppliers/' + supplierId);
        this.supplierRef.on('value', (snap) => {
            this.setState({
                supplierName: snap.val().supplierName
            });
        });

        this.suppliersRef = FirebaseDB.database().ref('Suppliers/' + supplierId + '/items');
        this.suppliersRef.on('value', (snapshot) => {

            var items = snapshot.val();
            var newitems = [];
            for (let item in items) {
                newitems.push({
                    itemName: items[item].itemName,
                    itemUnit: items[item].itemUnit,
                    itemUnitPrice: items[item].itemUnitPrice,
                    itemPaymentType: items[item].itemPaymentType,
                    update: <MDBBtn color="default" size="sm" id={item} onClick={this.updateItem}><MDBIcon  id={item}  onClick={this.updateItem} far icon="edit" size="2x"/></MDBBtn>,
                    delete: <MDBBtn color="red" size="sm" id={item} onClick={this.deleteItem}><MDBIcon  id={item}  onClick={this.deleteItem} far icon="trash-alt" size="2x"/></MDBBtn>
                });
            }
            this.setState({
                rows: newitems,
            });
            this.setState({
                data: {
                    columns: this.state.columns,
                    rows: this.state.rows
                }
            });
        });
    };

    componentWillMount() {
        document.title = "Items";

        let currentUrl = window.location.href;
        let supplierId = (currentUrl.split('/')[4]);
        console.log(currentUrl);
        console.log(supplierId);
        this.setState({
            supplierId: supplierId
        });

        this.supplierRef = FirebaseDB.database().ref('Suppliers/' + supplierId);
        this.supplierRef.on('value', (snap) => {
            this.setState({
                supplierName: snap.val().supplierName
            });
        });

        this.suppliersRef = FirebaseDB.database().ref('Suppliers/' + supplierId + '/items');
        this.suppliersRef.on('value', (snapshot) => {

            var items = snapshot.val();
            var newitems = [];
            for (let item in items) {
                newitems.push({
                    itemName: items[item].itemName,
                    itemUnit: items[item].itemUnit,
                    itemUnitPrice: items[item].itemUnitPrice,
                    itemPaymentType: items[item].itemPaymentType,
                    update: <MDBBtn color="default" size="sm" id={item} onClick={this.updateItem}><MDBIcon  id={item}  onClick={this.updateItem} far icon="edit" size="2x"/></MDBBtn>,
                    delete: <MDBBtn color="red" size="sm" id={item} onClick={this.deleteItem}><MDBIcon  id={item}  onClick={this.deleteItem} far icon="trash-alt" size="2x"/></MDBBtn>
                });
            }
            this.setState({
                rows: newitems,
            });
            this.setState({
                data: {
                    columns: this.state.columns,
                    rows: this.state.rows
                }
            });
        });
    };


    updateItem(e) {
        console.log(e.target.id);
        this.props.history.push("/supplierupdateitem/" + this.state.supplierId + "/" + e.target.id);
    };

    deleteItem(e) {
        console.log(e.target.id);
        let itemId = e.target.id;


        Swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    this.suppliersRef.child(itemId).remove();
                    Swal("Success !", "Item Deleted Successfully !", "success");
                }
            });
    };


    onClickBack(e) {
        this.props.history.push("/supplier");
    }


    render() {

        return (

            <MDBContainer fluid>

                <MDBRow>
                    <MDBCol lg="12" className="mb-5">
                        <div>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBIcon icon="chevron-circle-left" onClick={this.onClickBack}/> &nbsp; Supplier : {this.state.supplierName}
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol lg="12" className="mb-5">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBDataTable
                                    striped
                                    hover
                                    data={this.state.data}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>

        );//end of return
    };//end of render

}

export default SupplierViewItemsPage;