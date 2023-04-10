import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    const { name, img, seller, price, ratings } = props.product;

    return (
        <div className="product card mb-4 bg-base-100 shadow-xl">
            <figure>
                <img className='image-full' src={img} alt="Image Not Provided" />
            </figure>
            <div className="card-body product-information">
                <h5>Name: {name}</h5>
                <h4>Price: ${price}</h4>
                <h4>Seller: {seller}</h4>
                <h4><small>Ratings:{ratings}</small></h4>
            </div>
            <button onClick={() => props.handleAddToCart(props.product)} className='btn-cart'>
                <p className='btn-text'>Add to Cart</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;