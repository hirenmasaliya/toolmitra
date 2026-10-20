import { Tool } from "@/app/lib/types";

export const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://toolmitra.in";

export const tools: Tool[] = [
  // ───────────────────────── BUSINESS ─────────────────────────
  {
    slug: "gst-calculator", name: "GST Calculator", short: "Add or remove GST at 0.25%, 3%, 5%, 12%, 18% or 28%.", category: "Business",
    title: "GST Calculator India – Calculate 5%, 12%, 18% & 28% GST",
    description: "Free GST calculator for India. Add GST to a price or remove GST from a GST-inclusive amount and see the CGST and SGST split instantly.",
    how: ["Enter the amount.", "Choose the GST rate.", "Select whether the amount excludes or includes GST.", "Read the base price, CGST, SGST, total GST and final amount."],
    formula: "GST-exclusive: GST = Amount × Rate ÷ 100. GST-inclusive: Base = Amount × 100 ÷ (100 + Rate).",
    example: "₹1,000 at 18% GST (exclusive): GST = ₹180 (CGST ₹90 + SGST ₹90), total = ₹1,180. For ₹1,180 inclusive, base = ₹1,180 × 100 ÷ 118 = ₹1,000.",
    tips: [
      "Use the 'Include GST' option when a shop gives you a final MRP and you want the base price.",
      "For sales between states, the full GST is charged as IGST instead of being split into CGST and SGST.",
      "Always confirm the correct rate for your product or service on the official GST rate schedule.",
    ],
    faq: [
      { q: "How do I add GST to a price?", a: "Multiply the price by the GST rate and divide by 100, then add the result to the price." },
      { q: "How do I remove GST from a GST-inclusive price?", a: "Divide the inclusive amount by (1 + rate/100). The difference between the two is the GST." },
      { q: "What are CGST and SGST?", a: "For sales within a state, GST is split equally between the Central (CGST) and State (SGST) governments." },
      { q: "What is IGST?", a: "IGST is charged on sales between two states and equals the combined CGST and SGST rate." },
    ],
    related: ["profit-calculator", "discount-calculator", "number-to-words"],
  },
  {
    slug: "profit-calculator", name: "Profit Margin Calculator", short: "Find profit, margin and markup from cost and selling price.", category: "Business",
    title: "Profit Margin Calculator – Profit, Margin % & Markup %",
    description: "Calculate profit, profit margin and markup from your cost price and selling price. Built for shops, wholesalers and small businesses.",
    how: ["Enter the cost price.", "Enter the selling price.", "Read profit, margin % and markup %."],
    formula: "Profit = Selling − Cost. Margin % = Profit ÷ Selling × 100. Markup % = Profit ÷ Cost × 100.",
    example: "Cost ₹800, selling price ₹1,000: profit = ₹200, margin = 20%, markup = 25%.",
    tips: [
      "Margin can never exceed 100%, but markup can.",
      "Remember to include GST, shipping and packaging in your cost before judging profit.",
    ],
    faq: [
      { q: "What is the difference between margin and markup?", a: "Margin is profit as a share of the selling price. Markup is profit as a share of the cost price." },
      { q: "Is a 50% markup a 50% margin?", a: "No. A 50% markup equals a margin of about 33.3%." },
      { q: "What is a good profit margin?", a: "It depends on the business. Retail often runs at 10–30%, while services and software can be higher." },
    ],
    related: ["markup-calculator", "gst-calculator", "discount-calculator"],
  },
  {
    slug: "discount-calculator", name: "Discount Calculator", short: "See the sale price and how much you save.", category: "Business",
    title: "Discount Calculator – Sale Price & Savings",
    description: "Calculate the final price after a percentage discount and see exactly how much you save.",
    how: ["Enter the original price.", "Enter the discount percentage.", "Read the amount saved and the final price."],
    formula: "Saving = Price × Discount ÷ 100. Final price = Price − Saving.",
    example: "₹2,000 with 20% off: you save ₹400 and pay ₹1,600.",
    tips: ["A 20% discount means you pay 80% of the price.", "Two successive discounts of 10% and 10% equal 19% overall, not 20%."],
    faq: [
      { q: "How do I calculate a discount percentage?", a: "Divide the saving by the original price and multiply by 100." },
      { q: "How do I find the original price from the sale price?", a: "Divide the sale price by (1 − discount/100). For 20% off, divide by 0.8." },
    ],
    related: ["percentage-calculator", "gst-calculator", "profit-calculator"],
  },
  {
    slug: "markup-calculator", name: "Markup Calculator", short: "Get the selling price for a target markup.", category: "Business",
    title: "Markup Calculator – Selling Price from Cost",
    description: "Enter your cost and desired markup percentage to get the selling price, profit per unit and resulting margin.",
    how: ["Enter the cost price.", "Enter the markup %.", "Read the selling price, profit and margin."],
    formula: "Selling price = Cost × (1 + Markup ÷ 100).",
    example: "Cost ₹500 with a 30% markup: selling price = ₹650, profit = ₹150, margin ≈ 23.08%.",
    tips: ["Check the margin after setting a markup so it covers rent, wages and other expenses."],
    faq: [
      { q: "How do I price wholesale goods?", a: "Add your target markup to the cost, then check the resulting margin so it covers your expenses." },
      { q: "Why is my margin lower than my markup?", a: "Margin is measured against the selling price, which is larger than the cost, so the percentage is smaller." },
    ],
    related: ["profit-calculator", "gst-calculator", "discount-calculator"],
  },

  // ───────────────────────── FINANCE ─────────────────────────
  {
    slug: "emi-calculator", name: "EMI Calculator", short: "Monthly EMI, total interest and total payment.", category: "Finance",
    title: "EMI Calculator – Loan EMI, Interest & Total Payment",
    description: "Calculate your monthly loan EMI, total interest and total payable amount for home, car or personal loans.",
    how: ["Enter the loan amount.", "Enter the yearly interest rate.", "Enter the tenure in years.", "Read the monthly EMI, total interest and total payment."],
    formula: "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where r is the monthly rate and n the number of months.",
    example: "₹5,00,000 at 10% for 5 years: EMI ≈ ₹10,624, total payment ≈ ₹6,37,411, interest ≈ ₹1,37,411.",
    tips: ["A longer tenure lowers the EMI but increases total interest.", "Processing fees and insurance are not included in this estimate."],
    faq: [
      { q: "Is this the exact bank figure?", a: "It is an estimate. Banks may add fees or round differently." },
      { q: "How can I reduce my total interest?", a: "Choose a shorter tenure or make part-prepayments when you can." },
      { q: "Does the interest rate stay fixed?", a: "Only on fixed-rate loans. Floating-rate loans change with the lender's benchmark rate." },
    ],
    related: ["sip-calculator", "interest-calculator", "fd-calculator"],
  },
  {
    slug: "sip-calculator", name: "SIP Calculator", short: "Estimate the future value of a monthly SIP.", category: "Finance",
    title: "SIP Calculator – Mutual Fund SIP Returns Calculator",
    description: "Estimate the maturity value of a monthly SIP using an expected annual return. See total invested amount and estimated gains.",
    how: ["Enter the monthly investment.", "Enter the expected annual return.", "Enter the investment period in years.", "Read the invested amount, estimated gains and future value."],
    formula: "FV = P × [((1 + i)^n − 1) ÷ i] × (1 + i), where i is the monthly return and n the number of months. Instalments are assumed at the start of each month.",
    example: "₹5,000 per month for 10 years at 12%: invested ₹6,00,000, future value ≈ ₹11,61,695, gain ≈ ₹5,61,695.",
    tips: ["Returns on market-linked investments are not guaranteed.", "Starting early matters more than investing a larger amount later."],
    faq: [
      { q: "Is the result guaranteed?", a: "No. The result is an estimate based on the return you enter. Actual returns can be higher or lower." },
      { q: "What return should I assume?", a: "Use a conservative number. Past returns do not guarantee future results." },
      { q: "Does this include tax or expense ratio?", a: "No. Returns are shown before tax, exit load and other charges." },
    ],
    related: ["fd-calculator", "interest-calculator", "emi-calculator"],
  },
  {
    slug: "fd-calculator", name: "FD Calculator", short: "Fixed deposit maturity amount with compounding.", category: "Finance",
    title: "FD Calculator – Fixed Deposit Maturity Amount",
    description: "Calculate the maturity amount and interest earned on a fixed deposit with monthly, quarterly, half-yearly or yearly compounding.",
    how: ["Enter the deposit amount.", "Enter the annual interest rate.", "Enter the tenure in years.", "Choose how often interest compounds.", "Read the maturity amount and interest earned."],
    formula: "A = P × (1 + r ÷ n)^(n × t), where r is the annual rate as a decimal, n the compounding periods per year and t the years.",
    example: "₹1,00,000 at 7% for 2 years, compounded quarterly: maturity ≈ ₹1,14,888, interest ≈ ₹14,888.",
    tips: ["Most Indian banks compound FD interest quarterly.", "TDS and premature withdrawal penalties can change what you actually receive."],
    faq: [
      { q: "Which compounding should I choose?", a: "Quarterly is the most common for bank FDs. Check your FD receipt or bank for the exact rule." },
      { q: "Is FD interest taxable?", a: "Yes, interest is added to your income and taxed as per your slab. Banks may also deduct TDS." },
    ],
    related: ["interest-calculator", "sip-calculator", "emi-calculator"],
  },
  {
    slug: "interest-calculator", name: "Simple & Compound Interest Calculator", short: "Compare simple and compound interest side by side.", category: "Finance",
    title: "Simple & Compound Interest Calculator – Compare Both",
    description: "Calculate simple interest and compound interest on any amount and see the difference over time.",
    how: ["Enter the principal amount.", "Enter the annual rate.", "Enter the time in years.", "Choose the compounding frequency.", "Compare simple and compound results."],
    formula: "Simple: SI = P × R × T ÷ 100. Compound: A = P × (1 + R ÷ (100 × n))^(n × T), where n is the compounding frequency per year.",
    example: "₹1,00,000 at 8% for 3 years: simple interest = ₹24,000. Compounded yearly, interest ≈ ₹25,971.",
    tips: ["The gap between simple and compound interest grows quickly over long periods.", "Compounding works for you on savings and against you on loans."],
    faq: [
      { q: "What is the difference between simple and compound interest?", a: "Simple interest is earned only on the principal. Compound interest is earned on the principal plus previously earned interest." },
      { q: "Does more frequent compounding earn more?", a: "Yes, slightly. Monthly compounding yields a little more than yearly at the same rate." },
    ],
    related: ["fd-calculator", "sip-calculator", "emi-calculator"],
  },

  // ───────────────────────── EVERYDAY ─────────────────────────
  {
    slug: "percentage-calculator", name: "Percentage Calculator", short: "Percent of a number, percent share and percent change.", category: "Everyday",
    title: "Percentage Calculator – Find Percent of a Number",
    description: "Three quick percentage calculators: X% of Y, X is what % of Y, and percentage change.",
    how: ["Pick the type of calculation.", "Enter the two numbers.", "Read the result."],
    formula: "X% of Y = X ÷ 100 × Y. Change % = (New − Old) ÷ Old × 100.",
    example: "20% of 500 = 100. A price moving from ₹800 to ₹920 is a 15% increase.",
    tips: ["Always divide by the old value when calculating percentage change.", "A 20% rise followed by a 20% fall does not return you to the start."],
    faq: [{ q: "How do I calculate percentage change?", a: "Subtract the old value from the new value, divide by the old value and multiply by 100." }],
    related: ["discount-calculator", "gst-calculator", "emi-calculator"],
  },
  {
    slug: "age-calculator", name: "Age Calculator", short: "Exact age in years, months and days.", category: "Everyday",
    title: "Age Calculator – Calculate Exact Age in Years, Months & Days",
    description: "Enter a date of birth to get your exact age in years, months and days, plus total days lived.",
    how: ["Enter the date of birth.", "Optionally change the 'age at' date.", "Read the exact age."],
    example: "Born 10 March 1998, on 20 October 2026: 28 years, 7 months, 10 days.",
    tips: ["Use the 'age at' date for admission, exam or job cut-offs."],
    faq: [{ q: "Does it handle leap years?", a: "Yes. It uses real calendar dates." }],
    related: ["date-difference-calculator", "bmi-calculator", "percentage-calculator"],
  },
  {
    slug: "date-difference-calculator", name: "Date Difference Calculator", short: "Days, months and years between two dates.", category: "Everyday",
    title: "Date Difference Calculator – Days Between Two Dates",
    description: "Find the number of days, weeks, months and years between any two dates.",
    how: ["Pick the start date.", "Pick the end date.", "Read the difference."],
    example: "1 January 2026 to 20 October 2026 is 292 days (0 years, 9 months, 19 days).",
    faq: [{ q: "Is the end date included?", a: "No. The result is the elapsed time between the two dates." }],
    related: ["age-calculator", "percentage-calculator", "emi-calculator"],
  },
  {
    slug: "unit-converter", name: "Unit Converter", short: "Length, weight, area, volume and temperature.", category: "Everyday",
    title: "Unit Converter – Length, Weight, Area, Volume & Temperature",
    description: "Convert between common units such as km and miles, kg and pounds, sq ft and sq metre, litres and gallons, and °C and °F.",
    how: ["Choose a category.", "Pick the 'from' and 'to' units.", "Enter the value.", "Read the converted result."],
    formula: "Result = Value × (From factor ÷ To factor). Temperature uses its own formulas, e.g. °F = °C × 9/5 + 32.",
    example: "1 mile = 1.609344 km. 1 kg ≈ 2.2046 lb. 37 °C = 98.6 °F.",
    tips: ["Quintal here means 100 kg, as used in Indian markets.", "Local land units such as bigha and guntha vary by state, so they are not included."],
    faq: [
      { q: "How accurate is the converter?", a: "It uses standard conversion factors and shows up to 6 decimal places." },
      { q: "How do I convert Celsius to Fahrenheit?", a: "Multiply by 9, divide by 5 and add 32." },
    ],
    related: ["percentage-calculator", "bmi-calculator", "age-calculator"],
  },
  {
    slug: "number-to-words", name: "Number to Words (₹)", short: "Write rupee amounts in words, Indian system.", category: "Everyday",
    title: "Number to Words Converter – Rupees in Words (Lakh, Crore)",
    description: "Convert any amount into words using the Indian numbering system with lakh and crore. Useful for cheques, invoices and receipts.",
    how: ["Enter the amount in rupees.", "Read the amount in words.", "Copy it into your cheque, invoice or receipt."],
    example: "1,23,456.50 → One Lakh Twenty-Three Thousand Four Hundred Fifty-Six Rupees and Fifty Paise Only.",
    tips: ["Paise are rounded to two decimal places.", "Always double-check the wording before using it on a legal document or cheque."],
    faq: [
      { q: "Does it use lakh and crore?", a: "Yes. It follows the Indian numbering system." },
      { q: "What is the maximum amount?", a: "Amounts up to ₹9,99,99,99,99,999 are supported." },
    ],
    related: ["gst-calculator", "percentage-calculator", "profit-calculator"],
  },

  // ───────────────────────── HEALTH ─────────────────────────
  {
    slug: "bmi-calculator", name: "BMI Calculator", short: "Body mass index and healthy weight range.", category: "Health",
    title: "BMI Calculator – Body Mass Index & Healthy Weight Range",
    description: "Calculate your BMI from height and weight, see your WHO category and the weight range considered healthy for your height.",
    how: ["Enter your weight in kg.", "Enter your height in cm.", "Read your BMI, category and healthy weight range."],
    formula: "BMI = Weight (kg) ÷ Height (m)². WHO categories: below 18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, 30 and above obese.",
    example: "70 kg at 170 cm: BMI = 70 ÷ 1.7² ≈ 24.2, which is in the normal range.",
    tips: [
      "BMI does not measure body fat or muscle and is only a screening number.",
      "Many Indian health guidelines use lower cut-offs for Asian populations, so talk to a doctor for personal advice.",
    ],
    faq: [
      { q: "Is BMI accurate for everyone?", a: "No. It can misjudge athletes, older adults and people with high muscle mass." },
      { q: "Is this medical advice?", a: "No. It is general information. Please consult a doctor for health decisions." },
    ],
    related: ["unit-converter", "age-calculator", "percentage-calculator"],
  },

  // ───────────────────────── TEXT ─────────────────────────
  {
    slug: "word-counter", name: "Word Counter", short: "Count words, characters, sentences and reading time.", category: "Text",
    title: "Word Counter – Count Words, Characters & Reading Time",
    description: "Paste your text to instantly count words, characters, sentences and paragraphs, with estimated reading and speaking time.",
    how: ["Type or paste your text.", "Watch the counts update live.", "Check reading and speaking time."],
    tips: ["Reading time assumes about 200 words per minute, speaking time about 130.", "Your text stays in your browser and is never uploaded."],
    faq: [
      { q: "Are spaces counted as characters?", a: "Both totals are shown: with spaces and without spaces." },
      { q: "Is my text stored?", a: "No. Everything is processed on your device." },
    ],
    related: ["case-converter", "json-formatter", "password-generator"],
  },
  {
    slug: "case-converter", name: "Text Case Converter", short: "UPPERCASE, lowercase, Title Case and Sentence case.", category: "Text",
    title: "Text Case Converter – Uppercase, Lowercase, Title Case",
    description: "Change text to uppercase, lowercase, title case or sentence case in one click, then copy the result.",
    how: ["Paste your text.", "Click the case you want.", "Copy the converted text."],
    tips: ["Title case capitalises the first letter of every word.", "Sentence case capitalises only the first letter of each sentence."],
    faq: [{ q: "Does it work with Hindi or other scripts?", a: "Case only applies to scripts that have upper and lower case, such as English." }],
    related: ["word-counter", "json-formatter", "password-generator"],
  },

  // ───────────────────────── UTILITIES ─────────────────────────
  {
    slug: "password-generator", name: "Password Generator", short: "Create strong random passwords.", category: "Utilities",
    title: "Strong Password Generator – Random & Secure",
    description: "Generate strong random passwords with your choice of length, letters, numbers and symbols. Created in your browser, never sent anywhere.",
    how: ["Set the password length.", "Choose character types.", "Click Generate.", "Copy the password."],
    tips: ["Use at least 14 characters for important accounts.", "Use a different password for every account and store them in a password manager."],
    faq: [
      { q: "Is the password stored or sent anywhere?", a: "No. It is generated on your device using the browser's secure random generator." },
      { q: "What makes a password strong?", a: "Length and randomness. Long random passwords are much harder to guess than short complex ones." },
    ],
    related: ["qr-code-generator", "word-counter", "json-formatter"],
  },
  {
    slug: "qr-code-generator", name: "QR Code Generator", short: "Turn any link or text into a downloadable QR code.", category: "Utilities",
    title: "Free QR Code Generator – Create & Download PNG",
    description: "Create a QR code for a link, text, UPI ID or phone number. Free, no sign-up, generated in your browser.",
    how: ["Type or paste your text or link.", "Choose a size.", "Download the PNG."],
    tips: ["Test the code with your phone before printing.", "Use a larger size for posters and banners."],
    faq: [
      { q: "Is my data uploaded?", a: "No. The QR code is generated in your browser." },
      { q: "Do the codes expire?", a: "No. The code simply encodes your text, so it works as long as the link or information remains valid." },
    ],
    related: ["image-compressor", "image-to-pdf", "password-generator"],
  },
  {
    slug: "image-compressor", name: "Image Compressor", short: "Shrink JPG/PNG/WebP images in your browser.", category: "Utilities",
    title: "Image Compressor – Reduce Image Size Online Free",
    description: "Compress photos to a smaller file size without uploading them. Works in your browser.",
    how: ["Choose an image.", "Adjust the quality slider.", "Download the compressed JPG."],
    tips: ["Quality around 70% usually gives a big size drop with little visible change.", "Output is always JPG, so transparent areas turn white."],
    faq: [
      { q: "Are my images uploaded?", a: "No. Compression happens entirely on your device." },
      { q: "Why did the file get bigger?", a: "Already well-compressed images can grow slightly. Lower the quality slider and try again." },
    ],
    related: ["image-to-pdf", "qr-code-generator", "word-counter"],
  },
  {
    slug: "image-to-pdf", name: "Image to PDF", short: "Combine images into a single PDF.", category: "Utilities",
    title: "Image to PDF Converter – Combine JPG/PNG into PDF",
    description: "Convert one or more images into a single PDF file in your browser, no upload needed.",
    how: ["Select one or more images.", "Click Download as PDF.", "Save the file."],
    tips: ["Images appear in the order they were selected.", "Each image is placed on its own A4 page."],
    faq: [{ q: "Is there a page limit?", a: "No fixed limit, but very large images may be slow on older phones." }],
    related: ["image-compressor", "qr-code-generator", "word-counter"],
  },

  // ───────────────────────── DEVELOPER ─────────────────────────
  {
    slug: "json-formatter", name: "JSON Formatter", short: "Format, validate and minify JSON.", category: "Developer",
    title: "JSON Formatter & Validator – Beautify or Minify JSON",
    description: "Paste JSON to validate it, pretty-print it with indentation or minify it into one line. Runs in your browser.",
    how: ["Paste your JSON.", "Click Format or Minify.", "Copy the result or read the error message."],
    tips: ["JSON needs double quotes around keys and strings.", "Trailing commas are not allowed in JSON."],
    faq: [
      { q: "Is my JSON uploaded?", a: "No. It is processed in your browser." },
      { q: "Why do I get an error?", a: "Common causes are single quotes, trailing commas, or missing brackets." },
    ],
    related: ["word-counter", "case-converter", "password-generator"],
  },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
export const categories = ["Business", "Finance", "Everyday", "Health", "Text", "Utilities", "Developer"] as const;