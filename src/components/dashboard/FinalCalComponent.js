import React from 'react'
import { Card } from 'react-bootstrap'
import { numberFormat } from '../moneyFunction'

function FinalCalComponent({ yearData, yearhandson, yearexpense, yearincome }) {
    // console.log(yearData)
    return (
        <div>
            <Card
                style = {{ marginBottom : "5px" }}
            >
                <Card.Header style = {{ color : "blue" }} > 
                    <b> On Hand/year : { numberFormat(yearhandson) } </b> <br></br>
                    <b> Doc.Expense/year : { 
                         numberFormat(yearData.fc + yearData.insurance + yearData.national_cost + yearData.quarter_tax + yearData.rto)
                    } </b>
                </Card.Header>
                <Card.Body style = { yearhandson - (yearData.fc + yearData.insurance + yearData.national_cost + yearData.quarter_tax + yearData.rto) <= 0 ? { color : "red" } : { color : "green" } } >
                    <b> Income/year : { numberFormat(yearhandson - (yearData.fc + yearData.insurance + yearData.national_cost + yearData.quarter_tax + yearData.rto)) } </b>
                </Card.Body>
            </Card>
        </div>
    )
}

export default FinalCalComponent
