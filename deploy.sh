#!/bin/bash

# Build and deploy to Vercel
echo "Building application..."
npm run build

if [ $? -eq 0 ]; then
  echo "Build successful!"
  echo "Deploying to Vercel..."
  npx vercel --prod
else
  echo "Build failed!"
  exit 1
fi
