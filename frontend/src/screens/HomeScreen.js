import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listTopSellers } from '../actions/userActions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector(state => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      <h1>
        <span className='fa fa-star'></span> Top Sellers
      </h1>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant='danger'>{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          {sellers.length ? (
            <Carousel
              showArrows
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
            >
              {sellers.map(seller => (
                <div key={seller._id}>
                  <img
                    style={{
                      marginTop: '30px',
                      maxHeight: '150px',
                      maxWidth: '150px'
                    }}
                    src={seller.seller.logo}
                    alt={seller.seller.name}
                  />
                  <Link to={`/seller/${seller._id}`}>
                    <p
                      style={{
                        marginBottom: '30px',
                        textDecoration: 'underline'
                      }}
                    >
                      {seller.seller.name}
                    </p>
                  </Link>
                </div>
              ))}
            </Carousel>
          ) : null}
        </>
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className='row center'>
            {products.map(product => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
