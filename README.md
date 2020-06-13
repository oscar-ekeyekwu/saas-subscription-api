- SETUP:

  - INSTALL:

    - NODE
    - NPM
    - POSTMAN

  - FORK OR CLONE REPO:

    - https://github.com/oscar-ekeyekwu/saas-subscription-api

  - RUN COMMAND:

    - #initialize npm
    - "npm init"

    - #install dependencies
    - "npm install --save"

    - #start server
    - "npm start"

- LOGIN TO GENERATE TOKEN

  - ENPOINT:

    - localhost:3000/v1-node/login

  - REQUEST TYPE:

    - "POST"

  - USE:

    - #use this as req body parameters
    - #set the body to 'raw' and 'JSON(application/json)' in postman

    - email: saas@hng.ng
    - password: saas

  - COPY (from response):
    - 'token'
    - '\_id'

- SIGN UP TO ACCESS API AND GENERATE TOKEN

  - ENPOINT:

    - localhost:3000/v1-node/signup

  - REQUEST TYPE:

    - "POST"

  - INPUT:

    - #set req body in postman use 'raw' and 'JSON(application/json)' as format

    - name: String
    - email: String
    - password: String

  - COPY (from response):
    - 'token'
    - '\_id'

- PLANS MODULE

  - GET ALL PLANS:

    - ENDPOINT:

      - localhost:3000/v1-node/plan/all

    - REQUEST TYPE:

      - "GET"

    - COPY (from repsonse):
      - '\_id'

  - GET PLAN

    - ENDPOINT:

      - localhost:3000/v1-node/plan/< plan_id >

    - REQUEST TYPE:

      - "GET"

    - COPY (from repsonse):
      - '\_id'

  - NEW PLAN:

    - ENDPOINT:

      - localhost:3000/v1-node/plan/

    - REQUEST TYPE:

      - "POST"

    - INPUT:

      - #set req body in postman use 'raw' and 'JSON(application/json)' as format

      - name: String
      - cost: Number
      - discount: Number

    - COPY:
      - #copy response

  - UPDATE PLAN

    - ENDPOINT:

      - localhost:3000/v1-node/plan/< plan id >

    - REQUEST TYPE:

      - "PUT"

    - INPUT:

      - #set req body in postman use 'raw' and 'JSON(application/json)' as format

      - name: String
      - cost: Number
      - discount: Number

    - COPY:
      - #copy response

  - DELETE PLAN

    - ENDPOINT:

      - localhost:3000/v1-node/plan/< plan id >

    - REQUEST TYPE:

      - "DELETE"

    - COPY:
      - #copy response

- SUBSCRITPION MODULE

  - #Note - For all routes in this module, set request header

  - SET HEADER:
    - token: < login token >

  * GET ALL SUBSCRIPTIONS

    - ENDPOINT:

      - localhost:3000/v1-node/subscriptions/all

    - REQUEST TYPE:

      - "GET"

    - COPY (from repsonse):
      - '\_id'

  * GET SUBSCRIPTION

    - ENDPOINT:

      - localhost:3000/v1-node/subscriptions/< sub_id >

    - REQUEST TYPE:

      - "GET"

    - COPY (from repsonse):
      - '\_id'

  * NEW SUBSCRIPTION:

    - ENDPOINT:

      - localhost:3000/v1-node/subscribe

    - REQUEST TYPE:

      - "POST"

    - INPUT:

      - #set req body in postman use 'raw' and 'JSON(application/json)' as format

      - active: Boolean (default: true)
      - start_time: Date String (required)
      - end_time: Date String (required)

    - COPY:
      #copy response

  * UPDATE SUBSCRIPTION

    - ENDPOINT:
      localhost:3000/v1-node/subscriptions/< sub_id >

    - REQUEST TYPE:
      "PUT"

    - COPY:
      #copy response

  * DELETE SUBSCRIPTION

    - ENDPOINT:

      - localhost:3000/v1-node/subscriptions/< sub_id >

    - REQUEST TYPE:

      - "DELETE"

    - COPY:
      - #copy response

  - GET SUBSCRIPTION PLAN

    - ENDPOINT:

      - localhost:3000/v1-node/subscriptions/plan/< sub_id >

    - REQUEST TYPE:

      - "GET"

    - COPY:
      - #copy response

  - GET SUBSCRIBER

    - ENDPOINT:

      - localhost:3000/v1-node/subscriptions/subcriber/< sub_id >

    - REQUEST TYPE:

      - "GET"

    - COPY:
      - #copy response

- MODELS:

  - USER:

    - name: String
    - email: String
    - password: String

  - PLAN:

    - name: String
    - cost: Number
    - discount: Number

  - SUBSCRIPTION:
    - active: Boolean
    - start_time: Date
    - end_time: Date
    - plan: Schema Reference
    - user: Schema Reference
