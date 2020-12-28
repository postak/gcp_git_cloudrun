# gcp_git_cloudrun
This example show integration between *git* and *cloudrun* using *git actions*

It uses the action defined in https://github.com/google-github-actions/deploy-cloudrun/

After you created the repository you need to add two secrets to it

- GCP_PROJECT containing id of your GCP project
- GCP_CREDENTIALS containing the credential json file you create using the following commands

```
export YOUR_PROJECT_ID=put-your-project
export YOUR_ACCOUNT_NAME=put-your-account


gcloud iam service-accounts create $YOUR_ACCOUNT_NAME \
  --description="Cloud Run and Cloud Functions deploy account" \
  --display-name="Cloud-Run-Functions-Deploy"

gcloud projects add-iam-policy-binding $YOUR_PROJECT_ID \
  --member=serviceAccount:$YOUR_ACCOUNT_NAME@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/run.admin

gcloud projects add-iam-policy-binding $YOUR_PROJECT_ID \
  --member=serviceAccount:$YOUR_ACCOUNT_NAME@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/storage.admin

gcloud projects add-iam-policy-binding $YOUR_PROJECT_ID \
  --member=serviceAccount:$YOUR_ACCOUNT_NAME@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/iam.serviceAccountUser

gcloud projects add-iam-policy-binding $YOUR_PROJECT_ID \
  --member=serviceAccount:$YOUR_ACCOUNT_NAME@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/cloudfunctions.admin

gcloud iam service-accounts keys create key.json \
    --iam-account $YOUR_ACCOUNT_NAME@$YOUR_PROJECT_ID.iam.gserviceaccount.com
```
