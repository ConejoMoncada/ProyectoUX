import React, { Component } from 'react'
//import {storeProducts,detailProduct} from './data';
import { detailProduct } from './data';
import firebase from 'firebase';
const ProductContext = React.createContext();
//Provider
//Consumer
var storeProducts = [];

class ProductProvider extends Component {

    constructor(props) {
        super(props);
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

    fillarray() {
        var db = firebase.firestore().collection("messages");
        var that=this
        db.get().then(function (querySnapshot) {
            var tempo = [];
            querySnapshot.forEach(function (message) {
                const singleItem = ({
                    id: message.data().id,
                    title: message.data().title,
                    img: message.data().img,
                    price: message.data().price,
                    company: message.data().company,
                    info: message.data().info,
                    inCart: message.data().inCart,
                    count: message.data().count,
                    total: message.data().total
                });
                tempo.push(singleItem);
            });


            console.log(tempo + "NI IDEAA......");
            tempo.forEach(item => {
                const singleItem = { ...item };
                storeProducts = [...storeProducts, singleItem];
            });

            console.log(storeProducts + "Yo que hago aqui");

            that.setProducts()
        });

    }

    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0

    };


    componentDidMount() {
        
        this.fillarray()

        //this.setProducts();
    };



    setProducts = () => {



        // console.log(this.state);
        // console.log("OKAY.. " + storeProducts + " PUTO EL QUE LO LEA")
        //this.fillarray();
        console.log(storeProducts + "BARRIEEEERRRs");
        // console.log(firebaseProducts + "no se que putas x100000000000000");
        //console.log(this.state.products +"lol")
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
            return { products: tempProducts };
        });


    };

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };

    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product };
        });
    };
    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return { products: tempProducts, cart: [...this.state.cart, product] };
        },
            () => {
                this.addTotals();
            });
    };

    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true };
        });
    };
    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false };
        })
    };

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id)

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(
            () => {
                return { cart: [...tempCart] }
            },
            () => {
                this.addTotals();
            });
    };

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id)

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;

        if (product.count === 0) {
            this.removeItem(id)
        } else {
            product.total = product.count * product.price;
            this.setState(
                () => {
                    return { cart: [...tempCart] }
                },
                () => {
                    this.addTotals();
                });
        }
    };

    removeItem = (id) => {
        console.log('item removed');
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(
            () => {
                return {
                    cart: [...tempCart],
                    products: [...tempProducts]
                };
            },
            () => {
                this.addTotals();
            }
        );

    };





    clearCart = () => {
        this.setState(() => {
            return { cart: [] };
        }, () => {
            this.setProducts();
            this.addTotals();
        });
    };
    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total))
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total

            }
        })
    }


    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
        console.log(storeProducts + "ESTOYYY AL FINAL PERROOOOO")
    };
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };