import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Layout } from "../../components/layout/Layout";
import { routes } from "../../routes";
import OrderContext from "../../contexts/OrderContext";

import Mussarela from "../../assets/pizza-flavours/mucarela.png";
import ChickenWithCheese from "../../assets/pizza-flavours/frango-catupiry.png";
import Margherita from "../../assets/pizza-flavours/margherita.png";
import Lusa from "../../assets/pizza-flavours/portuguesa.png";

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

export default function Flavours() {
  const navigate = useNavigate();
  const { pizzaSize, setPizzaFlavour, setPizzaOrders } = useContext(OrderContext);
  const [selectedFlavours, setSelectedFlavours] = useState([]);
  const [flavourId, setFlavourId] = useState("");
  const [orderIndex, setOrderIndex] = useState(0); // Controla o índice do pedido no carrinho

  const flavoursOptions = [
    {
      id: "10",
      image: Mussarela,
      name: "Mussarela",
      description:
        "Muçarela especial fresca, finalizada com orégano e azeitonas portuguesas.",
      price: {
        "8": 71,
        "4": 35.5,
        "1": 18,
      },
    },
    {
      id: "11",
      image: ChickenWithCheese,
      name: "Frango com catupiry",
      description:
        "Peito de frango cozido, desfiado e refogado em azeite de oliva e temperos naturais, anéis de cebola sobre base de muçarela especial, bacon em cubos e Catupiry® gratinado. É finalizada com orégano.",
      price: {
        "8": 95,
        "4": 47.5,
        "1": 24,
      },
    },
    {
      id: "12",
      image: Margherita,
      name: "Margherita",
      description:
        "Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado.",
      price: {
        "8": 90,
        "4": 45,
        "1": 22.5,
      },
    },
    {
      id: "13",
      image: Lusa,
      name: "Portuguesa",
      description:
        "Clássica pizza, leva presunto magro, cebola, palmito e ervilha sobre base de muçarela fresca. Finalizada com cobertura de ovos, orégano e azeitonas portuguesas. ",
      price: {
        "8": 93,
        "4": 46.5,
        "1": 23.5,
      },
    },
  ];

  const getPizzaFlavour = (id) => {
    return flavoursOptions.find((flavour) => flavour.id === id);
  };

  const handleClick = (event) => {
    const id = event.target.id;
    const selectedFlavour = getPizzaFlavour(id);

    if (!selectedFlavour) {
      return;
    }

    if (selectedFlavours.length < 2) {
      setSelectedFlavours([...selectedFlavours, selectedFlavour]);
    } else {
      // Trate o caso de já ter selecionado dois sabores
    }
  };

  const handleBack = () => {
    navigate(routes.pizzaSize);
  };

  const handleContinue = () => {
    if (selectedFlavours.length > 0) {
      const totalValue = selectedFlavours.reduce(
        (total, flavour) => total + flavour.price[pizzaSize[0].slices],
        0
      );

      const payload = {
        item: {
          name: selectedFlavours.length === 1 ? "Pizza de Sabor Único" : "Pizza Meia",
          image: selectedFlavours.map((flavour) => flavour.image),
          size: pizzaSize[0].text,
          slices: selectedFlavours.length === 1
            ? pizzaSize[0].slices
            : pizzaSize[0].slices / 2,
          value: selectedFlavours.length === 1 ? totalValue : totalValue / 2,
        },
        total: totalValue,
      };

      setPizzaOrders((prevOrders) => {
        if (orderIndex < prevOrders.length) {
          // Substituir um pedido existente com os sabores selecionados
          const updatedOrders = [...prevOrders];
          updatedOrders[orderIndex] = payload;
          return updatedOrders;
        } else {
          // Adicionar o novo pedido ao carrinho
          return [...prevOrders, payload];
        }
      });

      if (orderIndex < selectedFlavours.length - 1) {
        // Se houver mais sabores a serem escolhidos, atualize o índice do pedido
        setOrderIndex(orderIndex + 1);
      } else {
        navigate(routes.summary);
      }
    } else {
      // Trate a situação quando nenhum sabor foi selecionado
      // Você pode exibir uma mensagem de erro ou tomar outra ação apropriada
    }
  };

  useEffect(() => {
    if (selectedFlavours.length > 0) {
      setFlavourId(selectedFlavours[0].id);
    }
  }, [selectedFlavours]);

  return (
    <Layout>
      <Title tabIndex={0}>Escolha o sabor da sua pizza</Title>
      <FlavourContentWrapper>
        {flavoursOptions.map(({ id, image, name, description, price }) => (
          <FlavourCard key={id} selected={id === flavourId}>
            <FlavourCardImage src={image} alt={name} />
            <FlavourCardTitle>{name}</FlavourCardTitle>
            <FlavourCardDescription>{description}</FlavourCardDescription>
            <FlavourCardPrice>
              {pizzaSize && pizzaSize[0] && pizzaSize[0].slices
                ? convertToCurrency(price[pizzaSize[0].slices])
                : "Preço não disponível"}
            </FlavourCardPrice>
            <Button id={id} onClick={handleClick}>
              Selecionar
            </Button>
          </FlavourCard>
        ))}
      </FlavourContentWrapper>
      <FlavourActionWrapper>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>
        <Button onClick={handleContinue}>Continuar</Button>
      </FlavourActionWrapper>
    </Layout>
  );
}
