import { Tool } from "@/app/lib/types";

export const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://toolmitra.in";

export const tools: Tool[] = [
  {
    slug: "gst-calculator", name: "GST Calculator", short: "Add or remove GST at 5%, 12%, 18% or 28%.", category: "Business",
    title: "GST Calculator India – Calculate 5%, 12%, 18% & 28% GST",
    description: "Free GST calculator for India. Add GST to a price or remove GST from a GST-inclusive amount and see CGST and SGST split instantly.",
    how: ["Enter the amount.", "Choose the GST rate.", "Select whether the amount excludes or includes GST.", "Read the base price, GST and total."],
    formula: "GST-exclusive: GST = Amount × Rate ÷ 100. GST-inclusive: Base = Amount × 100 ÷ (100 + Rate).",
    faq: [
      { q: "How do I add GST to a price?", a: "Multiply the price by the GST rate and divide by 100, then add the result to the price." },
      { q: "How do I remove GST from a GST-inclusive price?", a: "Divide the inclusive amount by (1 + rate/100). The difference is the GST." },
      { q: "What are CGST and SGST?", a: "For sales within a state, GST is split equally between the Central (CGST) and State (SGST) governments." },
    ],
    related: ["profit-calculator", "discount-calculator", "markup-calculator"],
  },
  {
    slug: "profit-calculator", name: "Profit Margin Calculator", short: "Find profit, margin and markup from cost and selling price.", category: "Business",
    title: "Profit Margin Calculator – Profit, Margin % & Markup %",
    description: "Calculate profit, profit margin and markup from your cost price and selling price. Built for shops, wholesalers and small businesses.",
    how: ["Enter the cost price.", "Enter the selling price.", "Read profit, margin % and markup %."],
    formula: "Profit = Selling − Cost. Margin % = Profit ÷ Selling × 100. Markup % = Profit ÷ Cost × 100.",
    faq: [
      { q: "What is the difference between margin and markup?", a: "Margin is profit as a share of the selling price. Markup is profit as a share of the cost price." },
      { q: "Is a 50% markup a 50% margin?", a: "No. A 50% markup equals a margin of about 33.3%." },
    ],
    related: ["markup-calculator", "gst-calculator", "discount-calculator"],
  },
  {
    slug: "discount-calculator", name: "Discount Calculator", short: "See the sale price and how much you save.", category: "Business",
    title: "Discount Calculator – Sale Price & Savings",
    description: "Calculate the final price after a percentage discount and see exactly how much you save.",
    how: ["Enter the original price.", "Enter the discount percentage.", "Read the amount saved and the final price."],
    formula: "Saving = Price × Discount ÷ 100. Final price = Price − Saving.",
    faq: [{ q: "How do I calculate a discount percentage?", a: "Divide the saving by the original price and multiply by 100." }],
    related: ["percentage-calculator", "gst-calculator", "profit-calculator"],
  },
  {
    slug: "markup-calculator", name: "Markup Calculator", short: "Get the selling price for a target markup.", category: "Business",
    title: "Markup Calculator – Selling Price from Cost",
    description: "Enter your cost and desired markup percentage to get the selling price and profit per unit.",
    how: ["Enter the cost price.", "Enter the markup %.", "Read the selling price and profit."],
    formula: "Selling price = Cost × (1 + Markup ÷ 100).",
    faq: [{ q: "How do I price wholesale goods?", a: "Add your target markup to the cost, then check the resulting margin so it covers your expenses." }],
    related: ["profit-calculator", "gst-calculator", "discount-calculator"],
  },
  {
    slug: "percentage-calculator", name: "Percentage Calculator", short: "Percent of a number, percent share and percent change.", category: "Everyday",
    title: "Percentage Calculator – Find Percent of a Number",
    description: "Three quick percentage calculators: X% of Y, X is what % of Y, and percentage change.",
    how: ["Pick the type of calculation.", "Enter the two numbers.", "Read the result."],
    faq: [{ q: "How do I calculate percentage change?", a: "Subtract the old value from the new value, divide by the old value and multiply by 100." }],
    related: ["discount-calculator", "gst-calculator", "emi-calculator"],
  },
  {
    slug: "age-calculator", name: "Age Calculator", short: "Exact age in years, months and days.", category: "Everyday",
    title: "Age Calculator – Calculate Exact Age in Years, Months & Days",
    description: "Enter a date of birth to get your exact age in years, months and days, plus total days lived.",
    how: ["Enter the date of birth.", "Optionally change the 'age at' date.", "Read the exact age."],
    faq: [{ q: "Does it handle leap years?", a: "Yes. It uses real calendar dates." }],
    related: ["date-difference-calculator", "percentage-calculator", "emi-calculator"],
  },
  {
    slug: "emi-calculator", name: "EMI Calculator", short: "Monthly EMI, total interest and total payment.", category: "Everyday",
    title: "EMI Calculator – Loan EMI, Interest & Total Payment",
    description: "Calculate your monthly loan EMI, total interest and total payable amount for home, car or personal loans.",
    how: ["Enter the loan amount.", "Enter the yearly interest rate.", "Enter the tenure in years.", "Read the monthly EMI."],
    formula: "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where r is the monthly rate and n the number of months.",
    faq: [{ q: "Is this the exact bank figure?", a: "It is an estimate. Banks may add fees or round differently." }],
    related: ["percentage-calculator", "age-calculator", "gst-calculator"],
  },
  {
    slug: "date-difference-calculator", name: "Date Difference Calculator", short: "Days, months and years between two dates.", category: "Everyday",
    title: "Date Difference Calculator – Days Between Two Dates",
    description: "Find the number of days, weeks, months and years between any two dates.",
    how: ["Pick the start date.", "Pick the end date.", "Read the difference."],
    faq: [{ q: "Is the end date included?", a: "No. The result is the elapsed time between the two dates." }],
    related: ["age-calculator", "percentage-calculator", "emi-calculator"],
  },
  {
    slug: "qr-code-generator", name: "QR Code Generator", short: "Turn any link or text into a downloadable QR code.", category: "Utilities",
    title: "Free QR Code Generator – Create & Download PNG",
    description: "Create a QR code for a link, text, UPI ID or phone number. Free, no sign-up, generated in your browser.",
    how: ["Type or paste your text or link.", "Choose a size.", "Download the PNG."],
    faq: [{ q: "Is my data uploaded?", a: "No. The QR code is generated in your browser." }],
    related: ["image-compressor", "image-to-pdf", "gst-calculator"],
  },
  {
    slug: "image-compressor", name: "Image Compressor", short: "Shrink JPG/PNG/WebP images in your browser.", category: "Utilities",
    title: "Image Compressor – Reduce Image Size Online Free",
    description: "Compress photos to a smaller file size without uploading them. Works in your browser.",
    how: ["Choose an image.", "Adjust the quality slider.", "Download the compressed JPG."],
    faq: [{ q: "Are my images uploaded?", a: "No. Compression happens entirely on your device." }],
    related: ["image-to-pdf", "qr-code-generator", "gst-calculator"],
  },
  {
    slug: "image-to-pdf", name: "Image to PDF", short: "Combine images into a single PDF.", category: "Utilities",
    title: "Image to PDF Converter – Combine JPG/PNG into PDF",
    description: "Convert one or more images into a single PDF file in your browser, no upload needed.",
    how: ["Select one or more images.", "Click Create PDF.", "Download the file."],
    faq: [{ q: "Is there a page limit?", a: "No fixed limit, but very large images may be slow on older phones." }],
    related: ["image-compressor", "qr-code-generator", "gst-calculator"],
  },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
export const categories = ["Business", "Everyday", "Utilities"] as const;
