import React, { createContext, useState, useContext } from "react";

// Tipos
type PizzaSizeType = {
  text: string;
  slices: number;
  // Outros campos
};

type PizzaFlavourType = {
  name: string;
  price: { [key: number]: number };
  image: string;
  // Outros campos
};

type PizzaOrderType = {
  items: PizzaFlavourType[];
  total: number;
  // Outros campos
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

export const useOrderContext = () => useContext(OrderContext);

// Provedor do contexto
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
