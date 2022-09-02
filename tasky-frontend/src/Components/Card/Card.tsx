import { ReactNode } from "react";
import "./Card.css";

interface ICard {
  children: ReactNode;
}
const Card = ({ children }: ICard) => {
  return <div className="Card">{children}</div>;
};
export default Card;
