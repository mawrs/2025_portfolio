#!/bin/bash

# Add the Resume.tsx file to git staging
git add app/components/Resume.tsx

# Commit the changes with a descriptive message
git commit -m "Update Resume.tsx page with experience items"

# Push the changes to the remote repository
git push

echo "Changes to Resume.tsx have been pushed to GitHub successfully!" 