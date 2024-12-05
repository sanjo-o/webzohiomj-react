import React from 'react';
import styled from 'styled-components';

const DonationCard = ({ campaign }) => {
  return (
    <Card>
      <h2>Хандивлах дүн</h2>
      <AmountGrid>
        <AmountButton>500₮</AmountButton>
        <AmountButton>1,000₮</AmountButton>
        <AmountButton>5,000₮</AmountButton>
        <AmountButton>10,000₮</AmountButton>
        <AmountButton>20,000₮</AmountButton>
      </AmountGrid>
      <CustomAmount>
        <input type="text" placeholder="Өөр дүн оруулах" />
        <span>.00₮</span>
      </CustomAmount>
      <h3>Төлбөрийн хэрэгсэл</h3>
      <PaymentMethods>
        <PaymentButton><img src="/images/qpay.png" alt="QPay" /></PaymentButton>
        <PaymentButton><img src="/images/socialpay.png" alt="SocialPay" /></PaymentButton>
      </PaymentMethods>
      <DonateButton>Хандивлах</DonateButton>
    </Card>
  );
};

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const AmountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

const AmountButton = styled.button`
  background: #2F7169;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const CustomAmount = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  span {
    margin-left: 5px;
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const PaymentButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
`;

const DonateButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #2F7169;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default DonationCard;