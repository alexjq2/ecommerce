import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import NewsCard from "../components/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { filterNewsThunk } from "../store/slices/products.slice";
import { sendCartThunk } from "../store/slices/shoppingCart.slice";
import { useNavigate } from "react-router-dom";
const ProductDetail = () => {
    const {id} = useParams()
    const [newDetail, setNewDetail] = useState({})
    const allProducts = useSelector(state=> state.products)
    const dispatch = useDispatch()
    const [rate, setRate] = useState(1)

    useEffect(() => {
        axios
          .get(`https://ecommerce-api-hnfp.onrender.com/products/${id}`)
          .then(resp => {
            setNewDetail(resp.data)
            dispatch(filterNewsThunk(resp.data.categoryId))
        })
          .catch(error => console.error(error))
    }, [id])

    const addNewsProduct = () => {
      const data = {
        quantity : rate,
        productId : newDetail.id
      }
      dispatch(sendCartThunk(data))
    }

    const increment = () => {
      setRate(rate + 1)
    }
    const decrement = () => {
      if(rate > 1) {
        setRate(rate -1)
      }
    }
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const condition = () => {
      if (token) {
        addNewsProduct()
      } else {
        navigate("/Login")
      }
    }
    return (
        <>
           <Container>
           <Row xs={1} md={1}>
            <Col>
             <Row xs={1} md={2} >
               <Col  style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
               <Carousel data-bs-theme="dark"  >
                   {newDetail?.images?.map( data => (         
                    <Carousel.Item key={data.url} >
                        <img
                         className="d-block w-100"
                         src={data.url}
                         alt="Third slide"
                         style={{maxHeight:400, minHeight:400, minWidth: 370, maxWidth: 370 ,objectFit: "contain"}}
                       />
                    </Carousel.Item>                
                   ))}
                 </Carousel>
               </Col>
               <Col>
                <Row className="Product-details">
                    <h6>{newDetail.brand}</h6>
                    <h2>{newDetail.title}</h2>
                    <p>{newDetail.description}</p>
                    <div className="Product-num">
                        <div>
                            <h6>Precio</h6> <br/>
                            <h3>${newDetail.price}</h3>
                        </div>
                        <div>
                            <h6>Cantidad</h6> <br />
                            <div className="product-quantity">
                              <button className="quantity" onClick={decrement}>-</button>
                              <div className="quantity">{rate}</div>
                              <button className="quantity" onClick={increment}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                      <Button variant="primary" size="lg" onClick={condition}>
                        Agregar al carrito
                      </Button>
                    </div>
                </Row>
               </Col>
             </Row>
             </Col>
             <Col style={{marginTop:20}}>
               <Row xs={1} md={3}>
               {allProducts?.map(item => (
                 <Col key={item.id} style={{marginTop:20}}>               
                 <NewsCard 
                 data={item}
                 />
                 </Col>
               ))}   
               </Row>
             </Col>
           </Row>
           </Container>
        </>
    )
}
export default ProductDetail
