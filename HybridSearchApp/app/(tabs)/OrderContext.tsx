import { createContext, useContext, useState } from 'react';

const OrderContext = createContext<any>(null);

export const OrderProvider = ({ children }: any) => {
    const [order, setOrder] = useState({
        category: null,
        icon: null,
        type: null,
        address: null,
        lat: null,
        lng: null,
        details: null,
        photo: null,
    });

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);