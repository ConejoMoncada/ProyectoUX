import React, { Component } from 'react';
import firebase from 'firebase'
//import * as firebase from 'firebase';
//import {mainFirebase} from '../config/firebase';

export default class AdminPage extends Component {

    constructor(props) {

        super(props);
        this.state = { id: 0, title: '', img: '', price: 0, company: '', info: '', inCart: false, count: 0, total: 0 };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    saveMessage() {
        // Add a new message entry to the Firebase database.
        return firebase.firestore().collection('messages').add({

            id: this.state.id,
            title: this.state.title,
            img: this.state.img,
            price: this.state.price,
            company: this.state.company,
            info: this.state.info,
            inCart: this.state.inCart,
            count: this.state.count,
            total: this.state.total,

        }).catch(function (error) {
            console.error('Error writing new message to Firebase Database', error);
        });
    }

    handleChange(event) {
        //const id = event.target;
        //this.setState({ value: event.target.value });
        const target = event.target;
        const value = target.name === 'isGoing' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        // Saves a new message on the Cloud Firestore.
        this.saveMessage();
        alert('SE HA INGRESADO EXITOSAMENTE EL PRODUCTO A LA BASE DE DATOS');
        event.preventDefault();
        this.setState({
            id: 0, 
            title: '', 
            img: '', 
            price: 0, 
            company: '', 
            info: ''
        });
    }

    render() {
        return (

            <div className="d-flex justify-content-center align-items-center">
                <br />
                <br />
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="row">

                        <div className="col-10 mx-auto text-center text-slanted text-blue my-5">

                            <label>
                                <h2>
                                    ITEM ID:     
                        <input
                                        name="id"
                                        type="number"
                                        value={this.state.id}
                                        onChange={this.handleChange}
                                    />
                                </h2>
                            </label>
                            <br />

                            <label>
                                <h2>
                                    TITLE:
                   <input
                                        name="title"
                                        type="text"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                    />
                                </h2>
                            </label>
                            <br />

                            <label>
                                <h2>
                                    IMAGE:
                    <input
                                        name="img"
                                        type="text"
                                        value={this.state.img}
                                        onChange={this.handleChange}
                                    />
                                </h2>
                            </label>

                            <br />

                            <label>
                                <h2>
                                    PRICE $:
                    <input
                                        name="price"
                                        type="number"
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                    />
                                </h2>
                            </label>

                            <br />

                            <label>
                                <h2>
                                    COMPANY:
                    <input
                                        name="company"
                                        type="text"
                                        value={this.state.company}
                                        onChange={this.handleChange}
                                    />
                                </h2>
                            </label>

                            <br />

                            <label>
                                <h2>
                                    INFO:
                    <br />

                                    <textarea
                                        name="info"
                                        type="text"
                                        value={this.state.info}
                                        onChange={this.handleChange}
                                    />
                                </h2>
                            </label>
                            <br />
                            <input type="submit" value="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }


}