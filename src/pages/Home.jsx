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

import Dropdown from 'react-bootstrap/Dropdown';
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
    .get("https://ecommerce-api-hnfp.onrender.com/categories")
    .then(resp => setCategories(resp.data))
    .catch(error => console.error(error))
  }
  
    return (
        <main>
            <Row >
              <Col md={3}>
              <Dropdown>
                <Dropdown.Toggle variant="Primary" id="dropdown-basic">
                  Categorías
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {categories?.map( category => (
                  <Dropdown.Item 
                  key={category.id}
                  onClick={() => dispatch(filterNewsThunk(category.id))}
                  style={{cursor: "pointer"}}
                  >{category.name}
                  </Dropdown.Item>
                ))}
                </Dropdown.Menu>
              </Dropdown>
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
                    <Col key={item.id} style={{alignSelf: "stretch", maxHeight: 400, gap: 4, marginBottom: 10}}>
                    <NewsCard 
                    data={item}
                    />
                    </Col>
                  ))}
                
                </Row>
              </Col>
            </Row>
        </main>
    )
}
export default Home

