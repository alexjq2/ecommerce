import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector, useDispatch } from 'react-redux';
import { getFavoriteThunk } from '../store/slices/shoppingCart.slice';

function SideBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const shoppingCart = useSelector(state => state.shoppingCart )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFavoriteThunk())
  }, [])
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      <i className="fa-solid fa-cart-shopping fa-xl"></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <ul>
          {shoppingCart?.map(item => (
            <li key={item.product.id}>
              {item.product.title}
            </li>
          ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;