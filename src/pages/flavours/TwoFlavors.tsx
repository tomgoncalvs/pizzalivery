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
  const { pizzaSize, pizzaFlavour, setPizzaFlavour } = useContext(OrderContext);
  const [selectedFlavours, setSelectedFlavours] = useState(pizzaFlavour || []); // Initialize with current selections

  const getPizzaFlavour = (id) => {
    return flavoursOptions.find((flavour) => flavour.id === id);
  };

  const calculatePizzaPrice = (price) => {
    return price / 2; // Divide the price by 2
  };

  const handleSelect = (flavour) => {
    if (selectedFlavours.length < 2) {
      setSelectedFlavours([...selectedFlavours, flavour]);
    }
  };

  const handleDeselect = (flavour) => {
    setSelectedFlavours(selectedFlavours.filter((f) => f.id !== flavour.id));
  };

  const handleBack = () => {
    navigate(routes.pizzaSize);
  };

  const handleSaveSelection = () => {
    const totalPrice = selectedFlavours.reduce(
      (total, flavour) => total + calculatePizzaPrice(flavour.price[pizzaSize[0].slices]),
      0
    );

    const payload = {}; // Inicializa um objeto vazio

    // Crie um objeto para cada sabor selecionado
    selectedFlavours.forEach((flavour, index) => {
      payload[`item${index + 1}`] = {
        name: `Meia ${flavour.name}`,
        image: flavour.image,
        size: pizzaSize[0].text,
        slices: pizzaSize[0].slices / 2, // Divide o tamanho pela metade
        value: calculatePizzaPrice(flavour.price[pizzaSize[0].slices]),
      };
    });

    payload.total = totalPrice;

    setPizzaFlavour(payload);
    navigate(routes.summary, { totalPrice: totalPrice });
  };

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
