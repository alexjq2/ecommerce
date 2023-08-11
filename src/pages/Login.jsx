import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../style/loginStyle.css"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const userData = {
        email : email,
        password : password
    }
    const submitLogin = (e => {
        e.preventDefault()
        axios
          .post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", userData)
          .then(resp => {
            localStorage.setItem("token", resp.data.token)
            navigate("/")
        })
          .catch(error => console.error(error))
    })
    return (
        <main className='main-Login'>
          <Form className='login-form' onSubmit={submitLogin}>
          <ListGroup as="ul" style={{marginBottom: 10}}>
            <ListGroup.Item as="li" active>Usuario recomendado</ListGroup.Item>
            <ListGroup.Item as="li">usuarioprueba123@gmail.com</ListGroup.Item>
            <ListGroup.Item as="li" disabled>123456</ListGroup.Item>
          </ListGroup>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="Ingrese correo electrónico"
                value={email}
                onChange={e=> setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                Nunca compartas tu correo electrónico con nadie más.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Ingrese contraseña"
                value={password}
                onChange={e=> setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Ingresar
            </Button>
          </Form>
        </main>
    )
}
export default Login