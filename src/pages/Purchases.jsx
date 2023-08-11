import { format } from "date-fns";
import "../style/purchaseStyle.css"
import { useSelector } from "react-redux";

const Purchases = () => {
  const buys = useSelector(state => state.purchaseGet ) 
  
    return (
          <main className="purchase-main">
            <ul className="purchase-container">
              {buys.map(item => (
                <li key={item.id} className="purchase-li">
                  <div className="li-img">
                    <img src={item?.product?.images[0].url} alt="" />
                  </div>
                  <div className="li-title">
                    <p>{item.product.title}</p>
                  </div>
                  <div className="li-dated">
                    <span>{format(new Date(item.updatedAt), "dd-MM-yyyy")}</span>
                  </div>
                  <div className="li-quantity">
                    {item.quantity}
                  </div>
                  <div className="li-price">
                    <span>$ {item.product.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </main>
    )
}
export default Purchases