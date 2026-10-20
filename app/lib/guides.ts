export const guides = [
    {
    slug: "how-to-calculate-emi",
    tool: "emi-calculator",
    title: "How to Calculate EMI on a Loan",
    summary: "Understand the EMI formula and see how much interest you pay over the life of a loan.",
    body: [
      "An Equated Monthly Instalment (EMI) is the fixed amount you pay every month to repay a loan. Each EMI covers part of the principal and part of the interest charged on the outstanding balance.",
      "The formula is: EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1). Here, P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly instalments.",
      "For example, take a loan of ₹5,00,000 at 10% per year for 5 years. The monthly rate is 0.10 ÷ 12 ≈ 0.008333 and the number of instalments is 60. Putting these into the formula gives an EMI of about ₹10,624.",
      "To see the total cost, multiply the EMI by the number of months: ₹10,624 × 60 ≈ ₹6,37,411. Subtracting the ₹5,00,000 principal shows you pay roughly ₹1,37,411 as interest.",
      "In the early months, most of each EMI goes towards interest. Over time the interest share falls and the principal share rises. Processing fees, insurance, and prepayment charges are usually not included in this calculation, so check your loan agreement."
    ]
  },
  {
    slug: "how-to-calculate-sip-returns",
    tool: "sip-calculator",
    title: "How to Calculate SIP Returns",
    summary: "Estimate the future value of a monthly mutual fund SIP using an expected annual return.",
    body: [
      "A Systematic Investment Plan (SIP) lets you invest a fixed amount every month. Because each instalment is invested at a different time, the future value is calculated with a compounding formula rather than a simple multiplication.",
      "The formula is: Future Value = P × [((1 + i)^n − 1) ÷ i] × (1 + i). Here, P is the monthly investment, i is the monthly rate of return (expected annual return ÷ 12 ÷ 100), and n is the total number of monthly instalments. This version assumes each instalment is made at the start of the month.",
      "For example, if you invest ₹5,000 every month for 10 years at an assumed 12% annual return, then i = 0.01 and n = 120. The future value comes to about ₹11,61,695.",
      "Your total investment in that case is ₹5,000 × 120 = ₹6,00,000, so the estimated gain is about ₹5,61,695.",
      "Keep in mind that market-linked returns are not fixed. The 12% above is only an assumption for illustration, and actual returns can be higher or lower, or even negative in some periods."
    ]
  },
  {
    slug: "simple-interest-vs-compound-interest",
    tool: "interest-calculator",
    title: "Simple Interest vs Compound Interest: How to Calculate Each",
    summary: "Learn the difference between the two methods and see why compounding grows money faster.",
    body: [
      "Simple interest is calculated only on the original amount (the principal). Compound interest is calculated on the principal plus all the interest already earned, so your interest earns interest.",
      "The simple interest formula is: SI = (P × R × T) ÷ 100, where P is the principal, R is the annual rate in percent, and T is the time in years.",
      "For example, ₹1,00,000 at 8% for 3 years earns a simple interest of (1,00,000 × 8 × 3) ÷ 100 = ₹24,000. The total amount is ₹1,24,000.",
      "The compound interest formula is: A = P × (1 + R ÷ 100)^T when interest is compounded once a year. For the same ₹1,00,000 at 8% for 3 years, A = 1,00,000 × 1.08³ ≈ ₹1,25,971. The compound interest is about ₹25,971.",
      "The difference looks small over 3 years, but it grows quickly over longer periods and at higher rates. This is why long-term savings and investments benefit so much from compounding, while loans that compound can become expensive."
    ]
  },
  {
    slug: "how-to-calculate-percentage-change",
    tool: "percentage-calculator",
    title: "How to Calculate Percentage Increase and Decrease",
    summary: "Find out how much a value has grown or shrunk compared with its starting point.",
    body: [
      "Percentage change tells you how much a value has moved relative to where it started. It is useful for comparing prices, salaries, sales figures, and exam scores.",
      "The formula is: Percentage Change = ((New Value − Old Value) ÷ Old Value) × 100. A positive result is an increase and a negative result is a decrease.",
      "For example, if the price of a product rises from ₹800 to ₹920, the change is 120. Dividing by the old value gives 120 ÷ 800 = 0.15, so the price increased by 15%.",
      "If a price falls from ₹1,000 to ₹850, the change is −150, and −150 ÷ 1,000 × 100 = −15%. That is a 15% decrease.",
      "Always divide by the old value, not the new one. Also remember that a 20% increase followed by a 20% decrease does not bring you back to the start: ₹100 becomes ₹120, and 20% off ₹120 is ₹96."
    ]
  },
  {
    slug: "how-to-calculate-fd-maturity-amount",
    tool: "fd-calculator",
    title: "How to Calculate Fixed Deposit (FD) Maturity Amount",
    summary: "Work out what your fixed deposit will be worth at maturity, including compounding.",
    body: [
      "A fixed deposit pays interest at a fixed rate for a fixed period. Most banks in India compound FD interest quarterly, which means interest is added to your balance four times a year.",
      "The formula is: A = P × (1 + r ÷ n)^(n × t). Here, P is the deposit amount, r is the annual interest rate as a decimal (7% = 0.07), n is the number of compounding periods per year (4 for quarterly), and t is the time in years.",
      "For example, a deposit of ₹1,00,000 at 7% for 2 years, compounded quarterly, gives A = 1,00,000 × (1 + 0.07 ÷ 4)^8 ≈ ₹1,14,888. The interest earned is about ₹14,888.",
      "If the interest were compounded only once a year, the same deposit would grow to about ₹1,14,490, so more frequent compounding gives a slightly higher return.",
      "Actual maturity amounts can differ because banks may use different compounding rules, and senior citizen rates, premature withdrawal penalties, and tax deducted at source (TDS) can all change what you receive. Check with your bank for exact figures."
    ]
  },
  {
    slug: "how-to-calculate-age",
    tool: "age-calculator",
    title: "How to Calculate Your Exact Age in Years, Months and Days",
    summary: "Work out the exact time between a date of birth and any other date.",
    body: [
      "Your exact age is the time between your date of birth and a chosen date, usually today. It is shown as years, months, and days.",
      "Start by subtracting the birth year from the current year. If your birthday has not yet happened this year, subtract one year. Then count the full months since your last birthday, and finally the remaining days.",
      "For example, for a date of birth of 10 March 1998 and a date of 20 October 2026: adding 28 years takes you to 10 March 2026, adding 7 months takes you to 10 October 2026, and 10 more days reach 20 October 2026. The age is 28 years, 7 months, and 10 days.",
      "When the day of the month in the later date is smaller than the birth day, borrow days from the previous month. Because months have 28 to 31 days, this is where manual calculations most often go wrong.",
      "Age calculations are commonly needed for school admissions, job applications, insurance, and government forms, where the cut-off date matters. Always check which date the form uses for counting age."
    ]
  }
];