import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
function NewsCard({data}) {

    return (
      <Card style={{margin: 10}}>
        <Card.Img 
        variant="top" 
        src={data.images[0].url}
        style={{objectFit: 'cover'}}
        />
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card content.
          </Card.Text>
          <Button 
          variant="primary"
          as={Link}
          to={`/ProductDetail/${data.id}`}
          >Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
  
  export default NewsCard;