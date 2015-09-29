/**
  6.2.  Receiving Push Message Receipts
  "The application server requests the delivery of receipts from the
   push server by making a HTTP GET request to the receipt subscription
   resource.  The push service does not respond to this request, it
   instead uses HTTP/2 server push [RFC7540] to send push receipts when
   messages are acknowledged (Section 6.1) by the user agent."
  Provided as `Location:` in response to a `/receipt` request
  Attached to Push Message Delivery `/p` requests as a `Push-Receipt` field
  https://tools.ietf.org/html/draft-ietf-webpush-protocol-00#section-6.2
*/
