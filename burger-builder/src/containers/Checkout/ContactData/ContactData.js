import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //alert('You continue!');
        this.setState({ loading: true });
        // Calculate price on server to prevent users from changing it in their browser
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Arthur Lee',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '12345',
                    country: 'Canada'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false});
            });
        console.log(this.props.ingredients);
    }

    render () {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder = "Your name" />
                <input className={classes.Input} type="email" name="email" placeholder = "Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder = "Street" />
                <input className={classes.Input} type="text" name="postal" placeholder = "Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;