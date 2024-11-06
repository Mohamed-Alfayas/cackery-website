import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { getPrivacyAndPolicy } from '../../utils/cakeryAPI';

const PrivacyAndPolicy = () => {

  const [privacyPolicy, setPrivacyPolicy] = useState(null);

  const getPrivacyPolicyData = async () => {
    try {
      const response = await getPrivacyAndPolicy();
      setPrivacyPolicy(response?.data?.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPrivacyPolicyData();
  }, []);


  return (
    <section className="my-4">
      
        <Typography variant="h4" gutterBottom sx={{fontWeight: "700"}}>
          Privacy and Policy
        </Typography>
        <p style={{whiteSpace: "break-spaces"}}>{privacyPolicy}</p>
    </section>
  );
}

export default PrivacyAndPolicy;
