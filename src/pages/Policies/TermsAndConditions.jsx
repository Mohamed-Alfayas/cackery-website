import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { getTermsAndConditions } from '../../utils/cakeryAPI';

const TermsAndConditions = () => {

  const [termsPolicy, setTermsPolicy] = useState(null);

  
  const getTermsData = async () => {
    try {
      const response = await getTermsAndConditions();
      console.log("Dta",response);
      
      setTermsPolicy(response?.data?.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTermsData();
  }, []);


  return (
    <section className="my-4">
      
    <Typography variant="h4" gutterBottom sx={{fontWeight: "700"}}>
      Terms and Conditions
    </Typography>
    <p style={{whiteSpace: "break-spaces"}}>{termsPolicy}</p>
</section>
);
}

export default TermsAndConditions;
