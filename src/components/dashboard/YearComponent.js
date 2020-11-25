import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { numberFormat } from '../moneyFunction'

function YearComponent(props) {
    return (
        <div>
            <Row style ={{ padding : "5px", color : "gray" }} >
                <Col md >
                    <b>Permit Date : { new Date(props.yearData.national_date).toLocaleDateString('ta') } - { numberFormat(props.yearData.national_cost) }</b>
                </Col>
            </Row>

            <Row style ={{ padding : "5px", color : "gray" }} >
                <Col md >
                    Amount : { numberFormat(props.yearData.national_cost) }
                </Col>
            </Row>

            <Row style ={{ padding : "5px", color : "gray" }} >
                <Col md >
                    <b>Insurance Date : { new Date(props.yearData.insurance_date).toLocaleDateString('ta') }</b>
                </Col>
            </Row>

            <Row style ={{ padding : "5px", color : "gray" }} >
                <Col md >
                    Amount : { numberFormat(props.yearData.insurance) }
                </Col>
            </Row>

            <Row style ={{ padding : "5px", color : "gray" }} >
                <Col md >
                    <b>Q.tax Date : { new Date(props.yearData.quarter_tax_date).toLocaleDateString('ta') }</b>
                </Col>
            </Row>

            <Row style ={{ padding : "5px", color : "gray" }} >
                <Col md >
                    Amount : { numberFormat(props.yearData.quarter_tax) }
                </Col>
            </Row>

            <Row style ={{ padding : "5px", color : "gray" }} >
                <Col md >
                    <b>FC Date : { new Date(props.yearData.fc_date).toLocaleDateString('ta') }</b>
                </Col>
            </Row>

            <Row style ={{ padding : "5px", color : "gray" }} >
                <Col md >
                    Amount : { numberFormat(props.yearData.fc) }
                </Col>
            </Row>

            <Row style ={{ padding : "5px", color : "gray" }} >
                <Col md >
                    <b>RTO Amount : { numberFormat(props.yearData.rto) }</b>
                </Col>
            </Row>
        </div>
    )
}

export default YearComponent
