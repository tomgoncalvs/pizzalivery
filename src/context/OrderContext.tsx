import { createContext, useState } from "react";

type PizzaSizeType = {
  id: string;
  flavours: number;
  size: number;
  slices: number;
  text: string;
};

type PizzaFlavourType = {
  id: string;
  image: string;
  name: string;
  description: string;
  price: {
    "8": number;
    "4": number;
    "1": number;
  };
};

type PizzaOrderType = {
  item: {
    name: string;
    image: string[];
    size: string;
    slices: number;
    value: number;
  };
  total: number;
};

type OrderContextProps = {
  pizzaSize: PizzaSizeType | null;
  setPizzaSize: React.Dispatch<React.SetStateAction<PizzaSizeType | null>>;
  pizzaFlavour: PizzaFlavourType[];
  setPizzaFlavour: React.Dispatch<React.SetStateAction<PizzaFlavourType[]>>;
  pizzaOrders: PizzaOrderType[];
  setPizzaOrders: React.Dispatch<React.SetStateAction<PizzaOrderType[]>>;
};

const OrderContext = createContext<OrderContextProps>({
  pizzaSize: null,
  setPizzaSize: () => {},
  pizzaFlavour: [],
  setPizzaFlavour: () => {},
  pizzaOrders: [],
  setPizzaOrders: () => {},
});

export { OrderContext };

const OrderContextProvider: React.FC = ({ children }) => {
  const [pizzaSize, setPizzaSize] = useState<PizzaSizeType | null>(null);
  const [pizzaFlavour, setPizzaFlavour] = useState<PizzaFlavourType[]>([]);
  const [pizzaOrders, setPizzaOrders] = useState<PizzaOrderType[]>([]);

  return (
    <OrderContext.Provider
      value={{
        pizzaSize,
        setPizzaSize,
        pizzaFlavour,
        setPizzaFlavour,
        pizzaOrders,
        setPizzaOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContextProvider };
export default OrderContext;
