import { useState } from "react";
import { Button } from "../../components/button/Button";
import { Layout } from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export default function Sizes() {

  const navigate = useNavigate()
  const sizeOptions = [
  {
    id: 10,
    value: 'large',
    text: 'Grande',
  },
  {
    id: 11,
    value: 'large-2',
    text: 'Grande 2 Sabores',
  },
  {
    id: 20,
    value: 'medium',
    text: 'Média',
  },
  {
    id: 21,
    value: 'medium-2',
    text: 'Média 2 Sabores',
  },
  {
    id: 30,
    value: 'small',
    text: 'Broto',
  },
  {
    id: 31,
    value: 'small-2',
    text: 'Broto 2 Sabores',
  },
]

const [size, setSize] = useState("") 
const handleChange = (event) => {
  setSize(event.target.value)
}
const handleBack = () => {
  navigate(routes.home)
}
const handleNext = () => {
  if(size === "") {
    alert("Selecione o tamanho da pizza")
    return
  } else {
    navigate(routes.pizzaFlavor)
  }
  
}

 return(
  <Layout>
    <h1>Escolha o tamanho da sua pizza</h1>
    <section>
      {sizeOptions.map(({id, value, text}) => ( 
        <div key={id}>
          <input type="radio" id={value} name="sizes" value={value} onChange={handleChange}/>
          <label htmlFor={value}> {text}</label>
        </div>
      ))}
    </section>
    <div>
      <Button onClick={handleBack}>Voltar</Button>
      <Button onClick={handleNext}>Escolha o sabor</Button>
    </div>
  </Layout>
 )
}
