import React from 'react';
import {Route, Switch} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SupplierPage from './pages/SupplierPage';
import SupplierAddPage from './pages/SupplierAddPage';
import SupplierUpdatePage from './pages/SupplierUpdatePage';
import SupplierAddItemPage from './pages/SupplierAddItemPage';
import SupplierUpdateItemPage from './pages/SupplierUpdateItemPage';
import SupplierViewItemsPage from './pages/SupplierViewItemsPage';
import ProfilePage from './pages/ProfilePage';
import TablesPage from './pages/TablesPage';
import NotFoundPage from './pages/NotFoundPage';

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/' exact component={DashboardPage}/>
                <Route path='/dashboard' component={DashboardPage}/>
                <Route path='/supplier' component={SupplierPage}/>
                <Route path='/supplieradd' component={SupplierAddPage}/>
                <Route path='/supplierupdate/:id' component={SupplierUpdatePage}/>
                <Route path='/supplieradditem/:id' component={SupplierAddItemPage}/>
                <Route path='/supplierupdateitem/:supplierid/:itemid' component={SupplierUpdateItemPage}/>
                <Route path='/supplierviewitems/:id' component={SupplierViewItemsPage}/>
                <Route path='/profile' component={ProfilePage}/>
                <Route path='/tables' component={TablesPage}/>
                <Route path='/404' component={NotFoundPage}/>
            </Switch>
        );
    }
}

export default Routes;
