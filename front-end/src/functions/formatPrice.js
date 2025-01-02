export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IL', {
        style: 'currency',
        currency: 'ILS',
        // maximumSignificantDigits: 3,
    }).format(price);

};
export const formatNumber = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
};
