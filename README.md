# Image Recognition via SMS
Send sms with image url to receive recognition details from Blippar's engine

# Steps to run the recognition
* Create an account in textlocal.in
* Create an account in Blippar.
* Register for your free Blippar Visual Search key from https://developer.blippar.com/portal/vs-api/index/
* Provide your personalized settings
* Deploy the code in a publicly accessible server
* Provide the server IP or domain name under Forward messages section textlocal.in inbox settings
* Send sms from your phone to your registered mobile number from textlocal.in. It should contain following
  * Textlocal tag : optional
  * Recognise=<image_url>
* You'll shortly receive SMS from text local to your mobile containing recognition tags

# Settings:
* Secure Credentials:
  * apiKey: This should be your api key from text local service which you'll find under documentation after you login with your credentials
* Insecure Credentials: Alternatively to Api Key, you can directly use your access credentials, which is highly discouraged
  * username: The username you use to login to textlocal service
  * password: The password you use to login to textlocal service
  * hash: You'll find this under textlocal.in/docs once you login with your credentials 
* Service details:
  * textlocal-tag: This is your personalized or default tag that textlocal service will assign you for your account. You'll find this under control.textlocal.in/messages/ . You may choose to waiver this tag if you use multiple accounts for different services. In this case, just make it empty in the codebase
  * inbox_id: Your textlocal inbox indentifier. You can find the ID of your default inbox in the URL by going to Messages->View inbox 
* Blippar Visual Search Credentials: You'll shortly receive an email containing the details once you register for Blippar Visual Search
  * blipparVsClientId: Client ID for your Blippar account
  * blipparVsClientSecret: Client Secret for your Blippar account


# 3rd party service
* Blippar: https://developer.blippar.com/portal/vs-api/index/#demoSection
* Textlocal: https://textlocal.in
