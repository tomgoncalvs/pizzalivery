import React, { useContext, useState, useEffect } from 'react';
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
  const {
    pizzaSize,
    pizzaFlavour,
    pizzaOrders,
    setPizzaOrders,
    orderIndex,
    setOrderIndex,
    orders,
    setOrders,

  } = useContext(OrderContext);

  const [summaryData, setSummaryData] = useState([]);
  const [summaryAmount, setSummaryAmount] = useState(0);

  const handleBack = () => {
    navigate(routes.pizzaFlavour);
  };

  const handleNext = () => {
    if (summaryData.length > 0) {
      const totalAmount = summaryData.reduce((total, item) => total + item.price, 0);

      // Crie um novo pedido com os itens de resumo
      const newOrder = {
        items: [...summaryData],
        total: totalAmount,
      };

      // Adicione o novo pedido ao contexto
      setPizzaOrders((prevOrders) => [
        ...prevOrders,
        { ...newOrder, index: orderIndex },
      ]);

      // Atualize o índice do pedido atual
      setOrderIndex(orderIndex + 1);

      // Limpe as seleções atuais
      setSummaryData([]);
      setSummaryAmount(0);

      navigate(routes.checkout);
    } else {
      // Trate a situação quando nenhum sabor foi selecionado
      // Você pode exibir uma mensagem de erro ou tomar outra ação apropriada
    }
  };

  const handleAddAnotherPizza = () => {
    if (pizzaFlavour) {
      const flavor = pizzaFlavour[0];
      const price = flavor.price[pizzaSize[0].slices];
      const newProduct = {
        text: pizzaSize[0].text,
        slices: pizzaSize[0].slices,
        name: flavor.name,
        price: price,
        image: flavor.image,
      };

      // Adicione o novo produto ao resumo existente
      setSummaryData([...summaryData, newProduct]);

      // Atualize o total do resumo
      setSummaryAmount((prevAmount) => prevAmount + price);
    }

    // Redefina as seleções de sabor e tamanho para a próxima pizza
    navigate(routes.pizzaSize);
  };

  useEffect(() => {
    if (!pizzaFlavour) {
      navigate(routes.pizzaFlavour);
    }

    if (!pizzaSize) {
      navigate(routes.home);
    }
  }, [pizzaSize, pizzaFlavour]);

  return (
    <Layout>
      <Title tabIndex={0}>Resumo do pedido</Title>
      <SummaryContentWrapper>
        {summaryData.map((flavor, index) => (
          <SummaryDetails key={index}>
            <SummaryImage src={flavor.image} alt={flavor.name} />
            <SummaryTitle>{flavor.name}</SummaryTitle>
            <SummaryDescription>
              {`${flavor.text} (${flavor.slices} pedaços)`}
            </SummaryDescription>
            <SummaryPrice>{convertToCurrency(flavor.price)}</SummaryPrice>
          </SummaryDetails>
        ))}
        <SummaryAmount>
          <SummaryPrice>{convertToCurrency(summaryAmount)}</SummaryPrice>
        </SummaryAmount>
      </SummaryContentWrapper>
      <SummaryActionWrapper>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>
        <Button onClick={handleNext}>Ir para o pagamento</Button>
        <Button onClick={handleAddAnotherPizza}>Adicionar outra pizza</Button>
      </SummaryActionWrapper>

      <div>
        <h2>Histórico de Pedidos</h2>
        <ul>
          {pizzaOrders.map((order, index) => (
            <li key={index}>
              <strong>Pedido {order.index}:</strong>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} - {item.size} - {item.slices} pedaços - Preço: {item.price}
                  </li>
                ))}
              </ul>
              <p>Total: {order.total}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
