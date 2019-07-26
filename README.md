# Confession chatbot for Facebook

There are many of confession pages in Facebook now, this chatbot helps automate sending confessions. Facebook users now can 
chat directly with page rather than sending their confession in another website. Chatbot also supports 2 languages: Vietnamese
and English.

## Technology
### Chatbot
Chatbot is written in **NodeJS** and deploy to **AWS** as **Lambda** function. This will helps minimize the monthly cost thanks on
the benefits of AWS Lambda.

### Database
To track status of conversation, Chatbot will store data on **AWS DynamoDB**. DynamoDB is an easy to use NoSQL database and totaly 
fit with stateless applications like Lambda function. Lambda function can interact with DynamoDB tables through **AWS API Gateway**.

## Usage
### Chatbot
#### Run in local
`npm run dev` to run simulated AWS Lambda server. This may not perfectly fit with real environment, but it helps you to debug Chatbot
with VSCode.

#### Test Chatbot in console mode
`npm run chatbot-console` to test in console mode, `npm run debug-chatbot` to debug chatbot in console mode.

#### Deploy as AWS Lambda function
Archive all items in root directory then upload to AWS Lambda. Handler: *app.handler*.

### Database
Config API Gateway to connect with DynamoDB service. Checkout config file: 
*lambda-config/ConfessionChatbot-Tokyo-190719-API-default-swagger-apigateway.json*.
