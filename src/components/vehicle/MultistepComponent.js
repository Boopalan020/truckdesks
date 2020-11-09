import React, { useState } from 'react'
import VehicleInfoComponent from './VehicleInfoComponent';
import YearlyComponent from './YearlyComponent';
import FormSubmitionComponent from './FormSubmitionComponent';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding : "10px"
  },
}));
function MultistepComponent(props) {
    const [step, setStep] = useState(1);
    const [formdata, setFormdata] = useState({
      vehicle_no : '',reg_date : '',due_date : '',engine_no : '',chasis_no:'',vehicle_model : '',total_due_amount: '',due_interest : '',
      total_months : '',completed_month: '',national_date : '',national_cost : '',insurance : '',insurance_date : '',
      fc : '',fc_date : '',quarter_tax_date : '',quarter_tax : '',rto : '',status : ''
    });
    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1); 
    const firstStep = () => setStep(1);

    switch (step) {
        case 1:
          return (
            <div>
              <TitleComponent />
              <VehicleInfoComponent
                formData={formdata}
                setFormData={setFormdata}
                nextStep={nextStep}
              />
            </div>
            
          );
        case 2:
          return (
            <div>
                <TitleComponent />
                <YearlyComponent
                    formData={formdata}
                    setFormData={setFormdata}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            </div>  
          );
        
        default:
          return (
            <div>
              <TitleComponent />
              <FormSubmitionComponent 
                formData={formdata}
                prevStep={prevStep}
                setFormData = {setFormdata}
                firstStep={firstStep}
              />
            </div>
          );
      }
}

const TitleComponent = () => {
  const classes = useStyles();
  return(
    <div className={classes.alignItemsAndJustifyContent}>
      <Typography variant="h5">
        Add vehicle  
      </Typography> 
    </div>
  )
}

export default MultistepComponent
