import React from "react"
import { render, fireEvent, getByDisplayValue } from "@testing-library/react"
import CheckoutForm from "./CheckoutForm"

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />)
})

test("form shows success message on submit with form details", () => {
    const { getByLabelText, getByText, getByDisplayValue, getByTestId} = render(<CheckoutForm />)

    //grab inputs
    const firstName = getByLabelText(/first name/i)
    //checkinputs are there
    expect(firstName).toBeInTheDocument()
    //fill out inputs
    fireEvent.change(firstName, { target: { value: 'Ian' } })
    //checkthat values are showing in inputs
    expect(getByDisplayValue(/ian/i)).toBeInTheDocument()
    //grab submit button and click
    const checkout = getByTestId('checkout')
    fireEvent.click(checkout)
    // Does message show?
    expect(getByText(/you have ordered some plants/i)).toBeInTheDocument()
    expect(getByText(/ian/i)).toBeInTheDocument()
    
})
