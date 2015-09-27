/**
  6.  Receiving Push Messages
  "A user agent requests the delivery of new push messages by making a
   GET request to a push message subscription resource.  The push
   service does not respond to this request, it instead uses HTTP/2
   server push [RFC7540] to send the contents of push messages as they
   are sent by application servers.

   Each push message is pushed in response to a synthesized GET request.
   The GET request is made to the push message resource that was created
   by the push server when the application server requested message
   delivery.  The response body is the entity body from the most recent
   request sent to the push resource.
  https://tools.ietf.org/html/draft-ietf-webpush-protocol-00#section-6
*/
