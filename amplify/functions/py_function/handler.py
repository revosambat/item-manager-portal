import json

def helloWorld(event, context):
  message = "Hello from your Amplify Gen 2 Python function!"
  
  # The function must return a dictionary structured for API Gateway.
  return {
    "statusCode": 200,
    "headers": {
      "Content-Type": "application/json",
      # Required for CORS to allow frontend access
      "Access-Control-Allow-Origin": "*" 
    },
    "body": json.dumps({ "message": message })
  }