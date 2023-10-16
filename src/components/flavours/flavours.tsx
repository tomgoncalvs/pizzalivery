import Mussarela from "../../assets/pizza-flavours/mucarela.png";
import ChickenWithCheese from "../../assets/pizza-flavours/frango-catupiry.png";
import Margherita from "../../assets/pizza-flavours/margherita.png";
import Lusa from "../../assets/pizza-flavours/portuguesa.png";

const flavours = [
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

export default flavours;
