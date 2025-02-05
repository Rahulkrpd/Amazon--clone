import React from 'react'
import "./product.css";
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating }) {
    const [{basket}, dispatch] = useStateValue();

    console.log('this is the basket',basket);

    const addToBasket = () => {
        //dispatch item into the data layer 
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            },
        });
    };


    return (
        <div className='product'>
            <div className="product__info">
                <p>{title}</p>

                <p className='product__price'>
                    <small>₹</small>
                    <small>{price}</small>
                </p>

                <div className="product__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>⭐</p>
                        ))}

                </div>
            </div>

            <img src={image} alt="" />
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    );
}

export default Product
