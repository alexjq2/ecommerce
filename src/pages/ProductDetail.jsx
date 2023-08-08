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

const ProductDetail = () => {
    const {id} = useParams()
    const [newDetail, setNewDetail] = useState({})
    const allProducts = useSelector(state=> state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        axios
          .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
          .then(resp => {
            setNewDetail(resp.data)
            dispatch(filterNewsThunk(resp.data.categoryId))
        })
          .catch(error => console.error(error))
    }, [id])

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
                         style={{maxWidth: "100%" }}
                       />
                    </Carousel.Item>                
                   ))}
                 </Carousel>
               </Col>
               <Col>
                <Row className="Product-details">
                    <h7>{newDetail.brand}</h7>
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
                              <button className="quantity">+</button>
                              <div className="quantity">{1}</div>
                              <button className="quantity">-</button>
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                      <Button variant="primary" size="lg">
                        Agregar al carrito
                      </Button>
                    </div>
                </Row>
               </Col>
             </Row>
             </Col>
             <Col>
               <Row xs={1} md={3}>
               {allProducts?.map(item => (
                 <Col key={item.id}>               
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
