import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MenuList from './components/MenuList';
import OrderForm from './components/OrderForm';
import TableBooking from './components/TableBooking';
import BillGeneration from './components/BillGeneration';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Restaurant Management System</h1>
                <Switch>
                    <Route path="/" exact component={MenuList} />
                    <Route path="/order" component={OrderForm} />
                    <Route path="/book-table" component={TableBooking} />
                    <Route path="/generate-bill" component={BillGeneration} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;