import { createContext, useState } from "react";

type PizzaSizeType = {
  // ... (seu tipo existente para pizzaSize)
};

type PizzaFlavourType = {
  // ... (seu tipo existente para pizzaFlavour)
};

type PizzaOrderType = {
  // ... (seu tipo existente para pizzaOrders)
};

type OrderContextProps = {
  pizzaSize: PizzaSizeType | null;
  setPizzaSize: React.Dispatch<React.SetStateAction<PizzaSizeType | null>>;
  pizzaFlavour: PizzaFlavourType[];
  setPizzaFlavour: React.Dispatch<React.SetStateAction<PizzaFlavourType[]>>;
  pizzaOrders: PizzaOrderType[];
  setPizzaOrders: React.Dispatch<React.SetStateAction<PizzaOrderType[]>>;
  orderIndex: number;
  setOrderIndex: React.Dispatch<React.SetStateAction<number>>;
};

const OrderContext = createContext<OrderContextProps>({
  pizzaSize: null,
  setPizzaSize: () => {},
  pizzaFlavour: [],
  setPizzaFlavour: () => {},
  pizzaOrders: [],
  setPizzaOrders: () => {},
  orderIndex: 0,
  setOrderIndex: () => {},
});

export { OrderContext };

const OrderContextProvider: React.FC = ({ children }) => {
  const [pizzaSize, setPizzaSize] = useState<PizzaSizeType | null>(null);
  const [pizzaFlavour, setPizzaFlavour] = useState<PizzaFlavourType[]>([]);
  const [pizzaOrders, setPizzaOrders] = useState<PizzaOrderType[]>([]);
  const [orderIndex, setOrderIndex] = useState(0);

  return (
    <OrderContext.Provider
      value={{
        pizzaSize,
        setPizzaSize,
        pizzaFlavour,
        setPizzaFlavour,
        pizzaOrders,
        setPizzaOrders,
        orderIndex,
        setOrderIndex,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContextProvider };
export default OrderContext;
