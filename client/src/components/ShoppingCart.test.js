import React from "react"
import { render } from "@testing-library/react"
import ShoppingCart from "./ShoppingCart"

const plants = [{   name:"Peperomia Rosso",
                    id:143,
                    scientificName:"Peperomia caperata rosso",
                    difficulty:"easy",
                    light:"direct",
                    img:"https://cdn.shopify.com/s/files/1/2781/9558/products/PEPEROMIA_ROSSO-1_800x.png?v=1587156590",
                    sizes:["small"],
                    watering:2,
                    description:"Rosalia is a stunner with glossy green leaves accompanied by bright red undersides. Her oval shaped leaves are deeply grooved, adding depth to her figure. Flower spikes will appear with bright light, adding even more character to this absolute beaut.",
                    price:21}, 
                {
                    name:"Staghorn Fern",
                    id:67148,
                    scientificName:"Platycerium bifurcatum",
                    difficulty:"medium",
                    light:"indirect",
                    img:"https://cdn.shopify.com/s/files/1/2781/9558/products/FERN_STAGHORN-11_800x.png?v=1587427931",
                    sizes:["small"],
                    watering:2,
                    description:"Originally from South Africa, Jade loves sun-drenched beaches, the occasional surf, and sandy soils. Too much water too often doesn't sit well with her, so maybe offer her a beer? (Please don't give your plants beer).",
                    price:15
                }]

test("displays plants in cart", () => {
   const { getByText } =  render(<ShoppingCart cart={plants}/>)

   const peperonmia = getByText(/peperomia rosso/i)
   const peperonmiaCost = getByText(/21/i)

   const staghorn = getByText(/staghorn fern/i)
   const staghornCost = getByText(/15/i)

   expect(peperonmia).toBeInTheDocument()
   expect(peperonmiaCost).toBeInTheDocument()
   expect(staghorn).toBeInTheDocument()
   expect(staghornCost).toBeInTheDocument()
})

test("cart totals balance correctly", () => {
    const { getByText } =  render(<ShoppingCart cart={plants}/>)
 
    const total = getByText(/total: \$36/i)

    expect(total).toBeInTheDocument()
 })