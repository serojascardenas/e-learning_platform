import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './components/Foundation';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Course from './pages/Course';

import theme from './theme';
import Billing from './pages/Billing';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import MyOrders from './pages/MyOrders';

const App = () => {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<Navbar />
				<Switch>
					<main>
						<Container fluid>
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
							<Route path="/cart/:id?" component={Cart} />
							<Route path="/course/:id?" component={Course} />
							<Route path="/billing" component={Billing} />
							<Route path="/payment" component={Payment} />
							<Route path="/place-order" component={PlaceOrder} />
							<Route path="/my-orders" exact component={MyOrders} />
							<Route path="/orders/:id" component={Order} />
							<Route path="/" exact component={Home} />
						</Container>
					</main>
				</Switch>
			</ThemeProvider>
		</Router>
	);
};

export default App;
