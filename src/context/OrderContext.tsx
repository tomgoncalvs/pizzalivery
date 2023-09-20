import { createContext, useState } from "react";

const OrderContext = createContext({})

const OrderContextProvider = ({children}) => {
    const [pizzaSize, setPizzaSize] = useState()

    return (
        <OrderContext.Provider value={{pizzaSize, setPizzaSize}}>
            {children}
        </OrderContext.Provider>
    )
}

export { OrderContextProvider }
export default OrderContext