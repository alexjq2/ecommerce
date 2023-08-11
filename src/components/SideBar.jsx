import { useState, useEffect} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector, useDispatch } from 'react-redux';
import { getFavoriteThunk, updateFavoriteThunk, deleteFavoriteThunk} from '../store/slices/shoppingCart.slice';
import { buyThunk } from '../store/slices/purchaseGet.slice';
import "../style/sideBarStyle.css";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function SideBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const shoppingCart = useSelector(state => state.shoppingCart )
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const condition = () => {
    if(token) {
      setShow(true)
    } else {
      navigate("/Login")
    }
  } 


  useEffect(() => {
    dispatch(getFavoriteThunk())
  }, [])
  const incrementQuantity = (favoriteNews) => {
    dispatch( updateFavoriteThunk(favoriteNews.id, favoriteNews.quantity + 1))
  }
  const decrementQuantity = (favoriteNews) => {
    if (favoriteNews.quantity > 1)
    {dispatch( updateFavoriteThunk(favoriteNews.id, favoriteNews.quantity - 1))}
  }
  const deleteProduct = (deleteNews) => {
    dispatch(deleteFavoriteThunk(deleteNews.id))
  }
  const purchaseProducts = () => {
    dispatch(buyThunk())
  }
  return (
    <>
      <button onClick={condition} style={{backgroundColor: "transparent", border: "none"}}>
        <i className="fa-solid fa-cart-shopping fa-xl"></i>
      </button>
      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="cart-products-list">
          {shoppingCart?.map(item => (
            <li key={item.product.id} className='li-container'>
              <div className='product-info'>
                <img src={item.product.images[0].url} alt="" className='li-img'/>
                <div className='details'>
                  <span className='brand'>{item.product.title}</span>
                  <div className='quantity-box'>
                    <div className='flex'>
                      <button onClick={ ( )=> decrementQuantity(item)}>-</button>
                        <div className="value">{item.quantity}</div>
                      <button  onClick={() => incrementQuantity(item)}>+</button>
                    </div>
                  </div>
                </div>
                <div className='button-delete'>
                  <button onClick={() => deleteProduct(item)}>
                    <i className="fa-solid fa-trash fa-xl"></i>
                  </button>
                </div>
              </div>
                <div className='total'>
                  <span>Precio: </span>
                  <b>$ {item.product.price}</b>
                </div>
            </li>
          ))}
          </ul>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={()=> purchaseProducts()}>
              Comprar
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
    

export default SideBar;