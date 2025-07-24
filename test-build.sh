#!/bin/bash


# Simulate different branch
export AWS_BRANCH="master" # Change this to test different branches
# export AWS_APP_ID="dummy-app-id" 

# Simulate environment variables (set these locally)
export PROD_MONGO_URI="mongodb+srv://dormo-solution:vFOqqmDPodWgt6PI@cluster0.e9ko1jm.mongodb.net/?retryWrites=true&w=majority"
export PROD_MONGO_DB="item-manager-db"
export STAGING_MONGO_URI="mongodb+srv://dormo-solution:vFOqqmDPodWgt6PI@cluster0.e9ko1jm.mongodb.net/?retryWrites=true&w=majority"
export STAGING_MONGO_DB="item-manager-staging"
export DEV_MONGO_URI="mongodb+srv://dormo-solution:vFOqqmDPodWgt6PI@cluster0.e9ko1jm.mongodb.net/?retryWrites=true&w=majority"
export DEV_MONGO_DB="item-manager-dev"

echo "Testing branch logic for: $AWS_BRANCH"

# Test the branch logic
if [ "AWS_BRANCH" = "main" ] || [ "$AWS_BRANCH" = "master" ]; then
    echo "Would deploy to production environment"
    echo "$PROD_MONGO_URI" | npx ampx sandbox secret set MONGO_URI
    echo "$PROD_MONGO_DB" | npx ampx sandbox secret set MONGO_DB
elif [ "$AWS_BRANCH" = "staging" ]; then
    echo "Would deploy to staging environment"
    echo "$STAGING_MONGO_URI" | npx ampx sandbox secret set MONGO_URI
    echo "$STAGING_MONGO_DB" | npm ampx sandbox secret set MONGO_DB
else
    echo "Would deploy to development environment"
    echo "$DEV_MONGO_URI" | npx ampx sandbox secret set MONGO_URI
    echo "$DEV_MONGO_DB" | npm ampx sandbox secret set MONGO_DB
fi

echo "Secrets set. Starting sandbox..."
npx ampx sandbox --profile default
