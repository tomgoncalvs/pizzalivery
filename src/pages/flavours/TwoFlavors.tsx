import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Layout } from "../../components/layout/Layout";
import { routes } from "../../routes";
import flavoursOptions from "../../components/flavours/flavours";
import OrderContext from "../../contexts/OrderContext";

import { convertToCurrency } from "../../helpers/convertToCurrency";

import {
  FlavourActionWrapper,
  FlavourCard,
  FlavourCardDescription,
  FlavourCardImage,
  FlavourCardPrice,
  FlavourCardTitle,
  FlavourContentWrapper,
} from "./Flavours.styles";
import { Title } from "../../components/title/Title";

export default function TwoFlavours() {
  const navigate = useNavigate();
  const { pizzaSize, pizzaFlavour, setPizzaFlavour, pizzaOrders, setPizzaOrders } = useContext(
    OrderContext
  );
  const [selectedFlavours, setSelectedFlavours] = useState([]);

  const getPizzaFlavour = (id) => {
    return flavoursOptions.find((flavour) => flavour.id === id);
  }

  const calculatePizzaPrice = (price) => {
    // Divide o preço por 2
    return price / 2;
  }

  const handleSelect = (flavour) => {
    if (selectedFlavours.length < 2) {
      setSelectedFlavours([...selectedFlavours, flavour]);
    }
  }

  const handleDeselect = (flavour) => {
    setSelectedFlavours(selectedFlavours.filter((f) => f.id !== flavour.id));
  }

  const handleBack = () => {
    navigate(routes.pizzaSize);
  }

  const handleSaveSelection = () => {
    // Calcula o preço total das duas pizzas
    const totalPrice = selectedFlavours.reduce(
      (total, flavour) => total + calculatePizzaPrice(flavour.price[pizzaSize[0].slices]),
      0
    );

    // Verifica se já existem dados no carrinho (pizzaOrders)
    if (pizzaOrders && pizzaOrders.length > 0) {
      // Crie um novo objeto para a nova seleção e adicione ao carrinho
      const newPizzaOrder = {
        item: {
          name: "Pedido de Pizza",
          image: selectedFlavours.map((flavour) => flavour.image),
          size: pizzaSize[0].text,
          slices: pizzaSize[0].slices / 2,
          value: totalPrice / 2,
        },
        total: totalPrice / 2,
      };
      setPizzaOrders([...pizzaOrders, newPizzaOrder]);
    } else {
      // Se o carrinho estiver vazio, adicione a nova seleção como o primeiro item
      setPizzaOrders([
        {
          item: {
            name: "Pedido de Pizza",
            image: selectedFlavours.map((flavour) => flavour.image),
            size: pizzaSize[0].text,
            slices: pizzaSize[0].slices / 2,
            value: totalPrice / 2,
          },
          total: totalPrice / 2,
        },
      ]);
    }

    setPizzaFlavour(selectedFlavours);
    navigate(routes.summary, { totalPrice: totalPrice / 2 });
  }

  useEffect(() => {
    if (pizzaFlavour) {
      setSelectedFlavours(pizzaFlavour);
    }
  }, [pizzaFlavour]);

  return (
    <Layout>
      <Title tabIndex={0}>Escolha até 2 sabores para sua pizza</Title>
      <FlavourContentWrapper>
        {flavoursOptions.map((flavour) => (
          <FlavourCard
            key={flavour.id}
            selected={selectedFlavours.some((f) => f.id === flavour.id)}
            onClick={() => {
              if (selectedFlavours.some((f) => f.id === flavour.id)) {
                handleDeselect(flavour);
              } else {
                handleSelect(flavour);
              }
            }}
          >
            <FlavourCardImage src={flavour.image} alt={flavour.name} />
            <FlavourCardTitle>{`Meia ${flavour.name}`}</FlavourCardTitle>
            <FlavourCardDescription>{flavour.description}</FlavourCardDescription>
            <FlavourCardPrice>
              {pizzaSize && pizzaSize[0]
                ? convertToCurrency(calculatePizzaPrice(flavour.price[pizzaSize[0].slices]))
                : ""}
            </FlavourCardPrice>
          </FlavourCard>
        ))}
      </FlavourContentWrapper>
      <FlavourActionWrapper>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>
        <Button onClick={handleSaveSelection}>Salvar Seleção</Button>
      </FlavourActionWrapper>
    </Layout>
  );
}
