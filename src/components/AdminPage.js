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
        var firebaseConfig = {
            apiKey: "AIzaSyAl0PY5fM40wqMFmhuF8XxBq0YIn_au6hQ",
            authDomain: "proyectoux-d7490.firebaseapp.com",
            databaseURL: "https://proyectoux-d7490.firebaseio.com",
            projectId: "proyectoux-d7490",
            storageBucket: "proyectoux-d7490.appspot.com",
            messagingSenderId: "885633033819",
            appId: "1:885633033819:web:684173c2920cea641b417e",
            measurementId: "G-N73EV4812D"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          firebase.analytics();

      
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


        alert('INFO: ' + this.state.info + ' ID:' + this.state.id);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    ID:
                   <input
                        name="id"
                        type="number"
                        value={this.state.id}
                        onChange={this.handleChange}
                    />

                </label>
                <br />

                <label>
                    TITLE:
                   <input
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />

                </label>
                <br />

                <label>
                    IMAGE:
                    <input
                        name="img"
                        type="text"
                        value={this.state.img}
                        onChange={this.handleChange}
                    />

                </label>

                <br />

                <label>
                    PRICE:
                    <input
                        name="price"
                        type="number"
                        value={this.state.price}
                        onChange={this.handleChange}
                    />

                </label>

                <br />

                <label>
                    COMPANY:
                    <input
                        name="company"
                        type="text"
                        value={this.state.company}
                        onChange={this.handleChange}
                    />

                </label>

                <br />

                <label>
                    INFO:
                    <input
                        name="info"
                        type="text"
                        value={this.state.info}
                        onChange={this.handleChange}
                    />

                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
    

}