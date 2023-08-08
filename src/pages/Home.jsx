import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewsCard from '../components/NewsCard';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import {getNewsThunk, filterNewsThunk, nameCategoryThunk} from "../store/slices/products.slice"
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
const Home = () => {

  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState("")
  const products = useSelector(state => state.products)
  
  useEffect(() => {
    dispatch(getNewsThunk())
    getCategories()
  }, [])
  const getCategories = () => {
    axios
    .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
    .then(resp => setCategories(resp.data))
    .catch(error => console.error(error))
  }
  
    return (
        <>
            <Row >
              <Col md={3}>
              <ListGroup>
                {categories?.map( category => (
                  <ListGroup.Item 
                  key={category.id}
                  onClick={() => dispatch(filterNewsThunk(category.id))}
                  style={{cursor: "pointer"}}
                  >{category.name}</ListGroup.Item>

                ))}
                
              </ListGroup>
              </Col>
              <Col md={9}>
                <Row>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Buscar producto..."
                    aria-label="Buscar producto..."
                    aria-describedby="basic-addon2"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <Button variant="primary" onClick={() => dispatch(nameCategoryThunk(search))}>Buscar</Button>{' '}
                </InputGroup>
                </Row>
                <Row xs={1} md={3}>

                  {products?.map(item => (
                    <Col key={item.id}>
                    <NewsCard 
                    data={item}
                    />
                    </Col>
                  ))}
                
                </Row>
              </Col>
            </Row>
        </>
    )
}
export default Home

