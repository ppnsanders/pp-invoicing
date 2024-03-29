pp-invoicing
===========

Invoicing Example App

This Invoicing Example App uses the Invoicing Version 2 API of the REST APIs (currently [Limited Release](https://developer.paypal.com/docs/limited-release/invoicing/api/))

The App is quite simple.

1. Clone the Repo
2. cd into `pp-invoicing`
3. run `npm install`
4. run `bower install`
5. run `npm start`
6. Open your browser to [http://localhost:8000/](http://localhost:8000/)

On the "home page", you'll be prompted for your setup information. This setup information consists of the following:

1. Partner
2. Merchant (invoice Sender)
3. Consumer (invoice Receiver)

This application assumes that you (the user) is the Partner.

You MUST set a Partner `email`, Partner `client_id`, and Partner `client_secret` to use this application.

Once you set those parameters, click "Connect a Merchant" to connect your own merchant account, upon return you will return to an invalid URL, and you must modify this return URL to work on Localhost. Modify the return URL to `http://localhost:8000/config?.....`

Alternatively, if you would like to test with my credentials, simply click "Use Default Creds" and it will use the Credentials I have hard-coded into the Application.

Then click "Save Settings".  This just sets some cookies with your credentials and access_tokens.

1. Back on the Invoice Fields/Invoice Object page, click "Create Invoice".
2. In the Invoice Respose Object on the page, you'll see the "Status Code" of `201` if it worked correctly.
3. Click "Continue to Send Invoice"
4. You'll see two fields to send emails to the `invoicer` and `recipient` set to `false` by default. if you edit `send_to_recipient` to `true` you'll see the additional fields to edit.
5. Click "Send Invoice"
6. Once the call completes, you'll see a Response Object "Status Code" of `200` if everything worked correctly.

As the default is to not send an email to the recipient, you can click the "Show Custom Invoice" button to see the Invoice in a custom layout as built by me in HTML/AngularJS.

I'll try to clean this up before Invoicing `v2` is no longer [Limited Release](https://developer.paypal.com/docs/limited-release/invoicing/api/), and add some more intuitive handles for the Connecting a Merchant to use your own credentials.

You'll also see a link in the top nav for "List Invoices", once you create a few invoices, you'll see them here.  From this page you can "make a payment" via the payment icon.  This simulates a Consumer paying the Merchant for an invoice with another method besides the Consumer paying online via PayPal. There is minimal validation done on the form to check that the amount entered isn't more than is due and that the currency is the same as the invoice currency, but that is all.  From this accordion view you can also click the "view invoice" icon and see the invoice as the customer would see it. The custom invoice URL is simple it's just `http://localhost:8000/custominv?inv=<PayPal_Invoice_ID>`. That would show you the invoice as the customer sees it with the transactions already completed and the status showing on the invoice. 

I'll add additional functionality as needed to complete this application, but for the most part, my testing should demonstrate the ability of the `v2 Invoicing APIs`.
