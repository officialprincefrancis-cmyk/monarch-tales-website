# Monarch Tales — Founding Families Payment SOP

Updated: 4 August 2026

## Public promise currently on the website

The displayed Founding Families price is the final customer price including standard shipping to an approved address in a supported region. Do not add ordinary shipping after acceptance. If an address is remote, exceptional, or unsupported, resolve the delivery position before requesting payment.

Current prices:

| Region | Total | 50% deposit | Final balance |
|---|---:|---:|---:|
| United States | US$149.00 | US$74.50 | US$74.50 |
| Australia | A$225.00 | A$112.50 | A$112.50 |
| Canada | C$215.00 | C$107.50 | C$107.50 |
| United Kingdom | £119.00 | £59.50 | £59.50 |

## Accepted-family journey

1. Application arrives through Formspree.
2. Review the family's fit, requested scope, delivery region, current capacity, and likely production batch.
3. Obtain a current Mixam quote using the exact book specification and the customer's delivery postcode.
4. Complete the job-cost check below. Do not accept an order that is expected to make a loss.
5. Send the family a personal acceptance email containing:
   - total price and currency;
   - 50% deposit amount;
   - expected production batch;
   - included story and illustration reviews;
   - cancellation and refund terms;
   - private Stripe deposit link.
6. Begin no commissioned work until Stripe shows the deposit as successfully paid.
7. Redirect a successful deposit payment to:
   `https://monarchtales.com/welcome.html?plan=legacy`
8. The welcome page sends the accepted family to:
   `https://monarchtales.com/story-form.html?plan=legacy`
9. Review the submitted story questionnaire and confirm receipt personally.
10. Complete story planning, character direction, writing, illustration, and the included review stages.
11. After final creative approval, send the private Stripe final-balance link.
12. Do not place the Mixam print order until the final balance is successfully paid and the delivery address is reconfirmed.
13. Save the Mixam invoice, tracking number, Stripe receipt, and customer approval with the job record.

## Stripe link structure

Create eight unlisted links:

- Four links named `Founding Families Legacy — 50% Deposit`, one in each supported currency.
- Four links named `Founding Families Legacy — Final Balance`, one in each supported currency.

For every link:

- use a one-time payment;
- collect the customer's full name and email;
- collect billing and shipping addresses;
- collect a phone number for delivery;
- allow only the supported destination country for that link;
- turn on automatic receipts;
- do not enable promotion codes;
- use the Monarch Tales logo and V2 brand colours;
- for deposit links, redirect successful payments to the welcome page;
- add a non-sensitive client reference such as `FF-001` when sending the link;
- confirm payment in the Stripe Dashboard instead of relying on a screenshot from the customer.

## Job-cost check before acceptance

For each application, calculate:

`Customer price`

`− estimated Stripe fees`

`− Mixam printing`

`− Mixam shipping`

`− packaging or replacement allowance`

`− tax/GST allowance where applicable`

`− other paid production tools or contractors`

`= contribution available for Monarch Tales creative labour and profit`

Use a conservative Stripe reserve of 6% for international or foreign-currency payments until the actual account data proves a lower reliable rate. For Australian domestic-card payments in AUD, use a 2% reserve. Add a further 5% production contingency to the total customer price.

Recommended control: printing, shipping, Stripe, packaging, and production contingency should ideally remain below 40% of the total customer price. Founding Family pricing may accept a smaller margin for learning and proof, but the subsidy must be recorded rather than mistaken for sustainable profit.

## Per-order cost record

| Field | Amount |
|---|---:|
| Customer price | |
| Deposit received | |
| Stripe fee on deposit | |
| Balance received | |
| Stripe fee on balance | |
| Mixam printing | |
| Mixam shipping | |
| Other direct costs | |
| Total direct costs | |
| Contribution before founder labour | |
| Founder hours | |
| Effective amount per founder hour | |

## Acceptance email template

Subject: Your Monarch Tales Founding Family application

Hello [Parent name],

Thank you for trusting Monarch Tales with this part of your family's story. I have personally reviewed your application and would love to invite your family into the Founding Families Collection.

Your confirmed Founding Family price is [total] including standard delivery to the approved address in [country]. A 50% deposit of [deposit] secures your place in production batch [batch]. The final balance of [balance] is due only after the included creative review stages and before printing.

Before paying, please review the attached commission scope and terms. If everything feels right, you can secure your place through this private Stripe link:

[DEPOSIT LINK]

After payment, Stripe will take you to the private welcome page and detailed story questionnaire. Please take your time with it—the details you share become the foundation of the keepsake.

Warmly,

Prince Francix  
Founder, Monarch Tales

## Final-balance email template

Subject: Your Monarch Tale is ready for its final production stage

Hello [Parent name],

Thank you for approving the final creative direction for your family's Monarch Tale. The remaining balance is [balance]. Once it is received, I will complete the final print checks and place the book into production.

[FINAL BALANCE LINK]

Please also confirm that the delivery address below is still correct:

[ADDRESS]

Warmly,

Prince

