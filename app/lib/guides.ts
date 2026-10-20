export const guides = [
  { slug: "how-to-calculate-gst", tool: "gst-calculator", title: "How to calculate GST (inclusive and exclusive)", summary: "Add GST to a price or remove it from a GST-inclusive amount.",
    body: ["To add GST to a price, multiply the price by the rate and divide by 100. For ₹1,000 at 18%, GST is ₹180 and the total is ₹1,180.", "To remove GST from an inclusive price, divide by 1 plus the rate. ₹1,180 ÷ 1.18 gives a base price of ₹1,000, so the GST was ₹180.", "For sales within a state the GST is split equally into CGST and SGST. Draft and expand this guide with your own examples before publishing."] },
  { slug: "how-to-calculate-profit-margin", tool: "profit-calculator", title: "How to calculate profit margin for a retail business", summary: "Understand margin versus markup with simple examples.",
    body: ["Profit is selling price minus cost price. Margin is profit divided by selling price, shown as a percentage.", "If you buy for ₹800 and sell for ₹1,000, profit is ₹200 and margin is 20%. Markup on cost is 25%.", "Expand this guide with your own retail examples before publishing."] },
  { slug: "how-to-calculate-discount", tool: "discount-calculator", title: "How to calculate a discount percentage", summary: "Work out the sale price and savings in seconds.",
    body: ["Multiply the original price by the discount percentage and divide by 100 to find the saving. Subtract it from the price for the final amount.", "A 20% discount on ₹2,000 saves ₹400, leaving ₹1,600.", "Expand this guide with your own examples before publishing."] },
];
