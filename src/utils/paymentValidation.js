export const validateCardNumber = (number) => {
  const regex = /^[0-9]{16}$/;
  if (!regex.test(number.replace(/\s/g, ''))) {
    return 'Invalid card number';
  }
  return null;
};

export const validateExpiry = (expiry) => {
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!regex.test(expiry)) {
    return 'Invalid expiry date (MM/YY)';
  }

  const [month, year] = expiry.split('/');
  const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
  const today = new Date();

  if (expDate < today) {
    return 'Card has expired';
  }
  return null;
};

export const validateCVC = (cvc) => {
  const regex = /^[0-9]{3,4}$/;
  if (!regex.test(cvc)) {
    return 'Invalid CVC';
  }
  return null;
};

export const formatCardNumber = (number) => {
  const cleaned = number.replace(/\s/g, '');
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(' ') : cleaned;
}; 