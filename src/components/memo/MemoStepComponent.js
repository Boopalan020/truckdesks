import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Container, Typography } from '@material-ui/core'
import Stepper from 'react-js-stepper'
import VechinfoComponent from './VechinfoComponent'
import TripComponent from './TripComponent'
import LoadComponent from './LoadComponent'
import DieselComponent from './DieselComponent'
import ExpenseComponent from './ExpenseComponent'

const useStyles = makeStyles((theme) => ({
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding : "10px"
  },
}));

const steps = [{title : ''}, {title : ''}, {title : ''}, {title : ''}, {title : ''}, {title : ''}, {title : ''}]
function MemoStepComponent() {
    const [step, setStep] = useState(6)
    const [formdata, setFormdata] = useState({
        vehicle_no : '',
        from : '',
        to : '',
        driver_name : '',
        cleaner_name : '',
        calc_date : '',
        advance_amount : '',
        start_km : '',
        end_km : '',
        total_km : '0',
        milege : '',
        Loads : 
        [
            {
                date : '',
                origin : '',
                end_point : '',
                type : '',
                weight : '',
                rent : '',
                loading_cost : '',
                unloading_cost : '',
                commission : ''
            }
        ],
        total_commission : '',
        diesel : 
        [
            {
                filled_date : '',
                litre : '',
                rate : '',
                rate_on_day : '',
                place : ''
            }
        ],
        total_diesel_litre : '',
        new_tyre : '',
        old_tyre : '',
        expense_details : 
        [
            {
                reason : '',
                amount : ''
            }
        ],
        rto_details : 
        [
            {
                place : '',
                amount : ''
            }
        ],
        total_rto : '',

        total_diesel_amount : '',
        total_loading : '',
        total_unloading : '',
        total_expense : '',
        driver_salary : '',
        cleaner_salary : '',
        pathayam : '',
        workshop : '',
        toll_gate : '',
        total_rent : '',

        final_balance : 
        {
            income : '',
            expense : '',
            hands_on : '',
            income_day : '',
            income_km : '',
            expense_km : ''
        }
    })

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)
    const firstStep = () => setStep(1)

    switch(step) {
        case 1 : 
            return (
                <div>
                    <Steppers 
                        steps = { steps }
                        activeState = { step }
                    />
                    <VehicleTitle />
                    <VechinfoComponent 
                        formdata = { formdata }
                        setFormdata = { setFormdata }
                        nextStep = { nextStep }
                    />
                </div>
            );
        
        case 2 : 
                return (
                    <div>
                        <Steppers 
                            steps = { steps }
                            activeState = { step }
                        />
                        <TripTitle />
                        <TripComponent 
                            formdata = { formdata }
                            setFormdata = { setFormdata }
                            nextStep = { nextStep }
                            prevStep = { prevStep }
                        />
                    </div>
                )
        case 3 : 
                return (
                    <div>
                        <Steppers 
                            steps = { steps }
                            activeState = { step }
                        />
                        <LoadingTitle />
                        <LoadComponent 
                            formdata = { formdata }
                            setFormdata = { setFormdata }
                            nextStep = { nextStep }
                            prevStep = { prevStep }
                        />
                    </div>
                )
        case 4 : 
                return (
                    <div>
                        <Steppers 
                            steps = { steps }
                            activeState = { step }
                        />
                        <DieselTitle />
                        <DieselComponent 
                            formdata = { formdata }
                            setFormdata = { setFormdata }
                            nextStep = { nextStep }
                            prevStep = { prevStep }
                        />
                    </div>
                )
        case 5 : 
                return (
                    <div>
                        <Steppers 
                            steps = { steps }
                            activeState = { step }
                        />
                        <OtherTitle />
                        <ExpenseComponent 
                            formdata = { formdata }
                            setFormdata = { setFormdata }
                            nextStep = { nextStep }
                            prevStep = { prevStep }
                        />
                    </div>
                )
        case 6 : 
                return (
                    <div>
                        <Steppers 
                            steps = { steps }
                            activeState = { step }
                        />
                        <RtoTitle />
                        <h5> Here comes RTO - PC form</h5>
                    </div>
                )
        case 7 : 
                return (
                    <div>
                        <Steppers 
                            steps = { steps }
                            activeState = { step }
                        />
                        <MainTitle />
                        <h5> Here comes Main form</h5>
                    </div>
                )
        default :
                return (
                    <div></div>
                )
    }
}
const VehicleTitle = () => {
    const classes = useStyles()
    return (
        <div className = { classes.alignItemsAndJustifyContent }>
            <Typography style={{color:"#2980b9"}} variant = "h5">
                Vehicle Info
            </Typography>
        </div>
    )
}
const TripTitle = () => {
    const classes = useStyles()
    return (
        <div className = { classes.alignItemsAndJustifyContent }>
            <Typography style={{color:"#2980b9"}} variant = "h5">
                Trip details
            </Typography>
        </div>
    )
}
const LoadingTitle = () => {
    const classes = useStyles()
    return (
        <div className = { classes.alignItemsAndJustifyContent }>
            <Typography style={{color:"#2980b9"}} variant = "h5">
                Loading Info
            </Typography>
        </div>
    )
}
const OtherTitle = () => {
    const classes = useStyles()
    return (
        <div className = { classes.alignItemsAndJustifyContent }>
            <Typography style={{color:"#2980b9"}} variant = "h5">
                Other Expense
            </Typography>
        </div>
    )
}
const DieselTitle = () => {
    const classes = useStyles()
    return (
        <div className = { classes.alignItemsAndJustifyContent }>
            <Typography style={{color:"#2980b9"}} variant = "h5">
                Diesel Info
            </Typography>
        </div>
    )
}
const RtoTitle = () => {
    const classes = useStyles()
    return (
        <div className = { classes.alignItemsAndJustifyContent }>
            <Typography style={{color:"#2980b9"}} variant = "h5">
                RTO-PC
            </Typography>
        </div>
    )
}
const MainTitle = () => {
    const classes = useStyles()
    return (
        <div className = { classes.alignItemsAndJustifyContent }>
            <Typography style = {{color : "#2980b9"}} variant = "h5">
                Overall
            </Typography>
        </div>
    )
}
function Steppers({steps, activeState }) {
    return (
        <>
            <Container maxWidth="sm">
                <Stepper
                    steps = { steps }
                    activeStep = { activeState }
                    showNumber = { true }
                />
            </Container>
        </> 
    )
}
export default MemoStepComponent
