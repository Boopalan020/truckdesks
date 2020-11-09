import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Container, Typography } from '@material-ui/core'
import Stepper from 'react-js-stepper'
import VechinfoComponent from './VechinfoComponent'
import TripComponent from './TripComponent'
import LoadComponent from './LoadComponent'
import DieselComponent from './DieselComponent'
import ExpenseComponent from './ExpenseComponent'
import RtoComponent from './RtoComponent'
import OverallComponent from './OverallComponent'

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
    const [step, setStep] = useState(1)
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
        total_km : '',
        milege : '',
        loads : 
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
        diesel : 
        [
            {
                filled_date : '',
                litre : '',
                rate : '0',
                rate_on_day : '0',
                place : ''
            }
        ],
        total_diesel_litre : '0',
        new_tyre : '0',
        old_tyre : '0',
        expense_details : 
        [
            {
                reason : '',
                amount : '0'
            }
        ],
        rto_details : 
        [
            {
                place : '',
                amount : '0'
            }
        ],
        trip_duration : '0',
        total_diesel_amount : '0',
        total_commission : '0',
        total_loading : '0',
        total_unloading : '0',
        total_expense : '0',
        driver_salary : '0',
        cleaner_salary : '0',
        pathayam : '0',
        workshop : '0',
        total_rto : '0',
        toll_gate : '0',
        total_rent : '0',
        bill_padi : '0',
        trip_expense : '0',
        
        final_balance : 
        {
            hands_on : '0',
            income_day : '0',
            income_km : '0',
            expense_km : '0'
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
                        <RtoComponent 
                            formdata = { formdata }
                            setFormdata = { setFormdata }
                            nextStep = { nextStep }
                            prevStep = { prevStep }
                        />
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
                        <OverallComponent 
                            formdata = { formdata }
                            setFormdata = { setFormdata }
                            prevStep = { prevStep }
                            firstStep = { firstStep }
                        />
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
