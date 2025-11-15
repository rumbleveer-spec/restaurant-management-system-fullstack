function calculateGST(amount) {
    const gstRate = 0.18; // 18% GST
    return amount * gstRate;
}

function generateBill(order) {
    const items = order.items;
    let totalAmount = 0;

    items.forEach(item => {
        totalAmount += item.price * item.quantity;
    });

    const gstAmount = calculateGST(totalAmount);
    const finalAmount = totalAmount + gstAmount;

    return {
        items: items,
        totalAmount: totalAmount,
        gstAmount: gstAmount,
        finalAmount: finalAmount,
    };
}

module.exports = {
    generateBill,
};