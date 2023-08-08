import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../style/loginStyle.css"
import { useState } from 'react';
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    return (
        <main>
          <Form className='login-form'>
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
                Enviar
            </Button>
          </Form>
        </main>
    )
}
export default Login