const notifyUserTemplate = ({ userName, productName, productUrl, adminName }) => {
    const subject = `Product back in stock: ${productName}`;
    const text = `Hi ${userName || 'Customer'},\n\nGood news — the product "${productName}" you asked about is back in stock. Visit the product page to place your order: ${productUrl}\n\nBest regards,\n${adminName || 'Store Team'}`;
    const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #333;">
      <h2>Good news, ${userName || 'Customer'}!</h2>
      <p>The product you requested <strong>${productName}</strong> is now back in stock.</p>
      <p style="margin:16px 0;"><a href="${productUrl}" style="background:#ff6b00;color:#fff;padding:10px 14px;border-radius:6px;text-decoration:none;">View Product</a></p>
      <p>If you have any questions reply to this email.</p>
      <p>Best regards,<br/><strong>${adminName || 'Store Team'}</strong></p>
    </div>
    `;

    return { subject, text, html };
}

export default notifyUserTemplate;
