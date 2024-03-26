import "./DetailsTable.css";
import { Product } from "../../assets/types";

type Props = {
  product: Product;
};

const DetailsTable = ({ product }: Props) => {
  return (
    <table id="details-table" className="flex">
      <thead>
        <tr className="flex column">
          <th>Category:</th>
          <th>Sleeve Type:</th>
          <th>Color:</th>
          <th>Available Size:</th>
        </tr>
      </thead>
      <tbody>
        <tr className="flex column">
          <td className="flex">{product.category}</td>
          <td>{product.sleeve}</td>
          <td>{product.color}</td>
          <td>{product.size.join(", ")}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DetailsTable;
