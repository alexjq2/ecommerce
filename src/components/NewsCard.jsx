import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { sendCartThunk } from '../store/slices/shoppingCart.slice';
import { useDispatch } from 'react-redux';
import "../style/newsCardStyle.css"
import { useNavigate } from 'react-router-dom';

function NewsCard({data}) {
  const dispatch = useDispatch()
  const sendCart = (data) => {
    const productAmount = {
      quantity : 1,
      productId : data
    }
    dispatch(sendCartThunk(productAmount))
  }
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const condition = () => {
    if (token) {
      sendCart(data.id)
    } else {
      navigate("/Login")
    }
  }

    return (
      <Card >
        <Link to={`/ProductDetail/${data.id}`}>
            <Card.Img 
            variant="top" 
            src={data.images[0].url}
            className='info-product-img'
            />
        </Link>
        <Card.Body>
          <Card.Text>{data.brand}</Card.Text>
          <Card.Title className='infor-product-title'>
            <p>{data.title} </p>
          </Card.Title>
          <Card.Text>$ {data.price}</Card.Text>
          <Button 
          variant="primary"
          onClick={() => condition()}
          >Añadir al carrito</Button>
        </Card.Body>
      </Card>
    );
  }
  
  export default NewsCard;