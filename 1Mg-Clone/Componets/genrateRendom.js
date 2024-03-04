const generateRandomInfo = () => {
    let today = new Date();
    let randomDays = Math.floor(Math.random() * 8); // Random number between 0 and 7 for days left
    let randomDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + randomDays);
    let randomPrice = (Math.random() * (1001 - 500) + 500).toFixed(2); // Random price between 500 and 1500
    let discount = Math.floor(Math.random() * 46) + 5; // Random discount between 5 and 50
    let discountedPrice = (randomPrice * (1 - discount / 100)).toFixed(2);

    let leftDays = Math.max(Math.ceil((randomDate - today) / (1000 * 3600 * 24)), 0);
    let leftDaysStr = leftDays > 0 ? leftDays + " Days " : "Today";

    return {
        leftDays: leftDaysStr,
        totalPrice: randomPrice,
        price: discountedPrice,
        discount: discount + "% Off"
    };
}
export default generateRandomInfo