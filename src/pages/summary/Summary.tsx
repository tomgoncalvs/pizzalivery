import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { routes } from "../../routes";
import OrderContext from "../../contexts/OrderContext";
import { Title } from "../../components/title/Title";
import { convertToCurrency } from "../../helpers/convertToCurrency";
import {
  SummaryActionWrapper,
  SummaryAmount,
  SummaryContentWrapper,
  SummaryDescription,
  SummaryDetails,
  SummaryImage,
  SummaryPrice,
  SummaryTitle,
} from "./Summary.style";
import { Button } from "../../components/button/Button";

export default function Summary() {
  const navigate = useNavigate();

  const { pizzaOrders, setPizzaOrder } = useContext(OrderContext);
  const currentOrder = pizzaOrders[pizzaOrders.length - 1]; // Obter o pedido mais recente
  const previousOrders = pizzaOrders.slice(0, -1); // Obter pedidos anteriores

  const handleBack = () => {
    navigate(routes.pizzaFlavour);
  };

  const handleNext = () => {
    navigate(routes.checkout);
  };

  return (
    <Layout>
      <Title tabIndex={0}>Resumo do pedido</Title>
      <SummaryContentWrapper>
        {currentOrder && (
          <SummaryDetails>
            <SummaryImage src={currentOrder.item.image} alt="" />
            <SummaryTitle>{currentOrder.item.name}</SummaryTitle>
            <SummaryDescription>
              {`${currentOrder.item.size} (${currentOrder.item.slices} pedaços)`}
            </SummaryDescription>
            <SummaryPrice>{convertToCurrency(currentOrder.item.value)}</SummaryPrice>
          </SummaryDetails>
        )}
        {previousOrders.length > 0 && (
          <div>
            <h2>Pedidos Anteriores</h2>
            {previousOrders.map((order, index) => (
              <div key={index}>
                <p>{order.item.name}</p>
                <p>{`${order.item.size} (${order.item.slices} pedaços)`}</p>
                <p>{convertToCurrency(order.item.value)}</p>
              </div>
            ))}
          </div>
        )}
        <SummaryAmount>
          <SummaryPrice>
            {convertToCurrency(currentOrder ? currentOrder.total : 0)}
          </SummaryPrice>
        </SummaryAmount>
      </SummaryContentWrapper>
      <SummaryActionWrapper>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>
        <Button onClick={handleNext}>Ir para o pagamento</Button>
      </SummaryActionWrapper>
    </Layout>
  );
}
