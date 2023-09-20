import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import { Layout } from "../../components/layout/Layout"
import OrderContext from "../../context/OrderContext"
import { routes } from "../../routes"

export default function Sizes() {

  const navigate = useNavigate()
  const { pizzaSize, setPizzaSize } = useContext(OrderContext)

    const sizeOptions = [
    {
      id: "10",
      flavours: 1,
      size: 35,
      slices: 8,
      text: "Grande",
    },

    {
      id: "11",
      flavours: 2,
      size: 35,
      slices: 8,
      text: "Grande",
    },

    {
      id: "20",
      flavours: 1,
      size: 28,
      slices: 4,
      text: "Média",
    },

    {
      id: "21",
      flavours: 2,
      size: 28,
      slices: 4,
      text: "Média",
    },

    {
      id: "30",
      flavours: 1,
      size: 18,
      slices: 1,
      text: "Broto",
    },

    {
      id: "31",
      flavours: 2,
      size: 18,
      slices: 1,
      text: "Broto",
    },
  ]

  const [sizeId, setSizeId] = useState("")

  const getPizzaSize = (sizeId: string) => {
    return sizeOptions.filter((option) => option.id === sizeId)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSizeId(event.target.value)
  }

  const handleBack = () => {
    navigate(routes.home)
  }

  const handleNext = () => {
    const selectedSize = getPizzaSize(sizeId)
    setPizzaSize(selectedSize)
    navigate(routes.pizzaFlavor)
  }

  useEffect(() => {
    console.log(pizzaSize)
  }, [])

  return (
    <Layout>
      <h1 tabIndex={0}>Escolha o tamanho da sua pizza</h1>

      <section>
        {sizeOptions.map(({ id, size, slices, flavours, text }) => (
          <article key={id}>
            <input
              type="radio"
              id={id}
              name="sizes"
              onChange={handleChange}
              value={id}
            />

            <label htmlFor={id}>
              {text} - {flavours} sabores
              <span>
                Pizza com {slices} pedaços e {size}cm
              </span>
            </label>
          </article>
        ))}
      </section>

      <div>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>

        <Button onClick={handleNext}>Escolha o Sabor</Button>
      </div>
    </Layout>
  )
}
