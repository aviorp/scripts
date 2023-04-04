#!/usr/bin/env zx

try {
  console.log("Configuring AWS CLI");
  await $`aws configure set aws_access_key_id ${process.env.AWS_ACCESS_KEY_ID} --profile default `;
  await $`aws configure set aws_secret_access_key ${process.env.AWS_SECRET_ACCESS_KEY} --profile default`;
  await $`aws configure set default.region ${process.env.AWS_DEFAULT_REGION} --profile default`;
  await $`aws s3 sync build/  s3://${process.env.AWS_BUCKET_NAME} --profile default`;
  await $`aws cloudfront create-invalidation --distribution-id ${process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID} --paths "/*" --profile default`;
  console.log("AWS CLI configured");
} catch (error) {
  console.error(error);
}
