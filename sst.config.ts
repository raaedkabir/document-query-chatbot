import { SSTConfig } from 'sst'
import { NextjsSite } from 'sst/constructs'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'

export default {
  config(_input) {
    return {
      name: 'document-query-chatbot',
      region: process.env.AWS_DEPLOYMENT_REGION!,
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site', {
        customDomain: {
          domainName: process.env.DOMAIN_NAME!,
          isExternalDomain: true,
          cdk: {
            certificate: Certificate.fromCertificateArn(
              stack,
              'MyCert',
              process.env.ACM_CERTIFICATE_ARN!
            ),
          },
        },
        environment: {
          OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
          PINECONE_API_KEY: process.env.PINECONE_API_KEY!,
          DYNAMODB_ACCESS_KEY_ID: process.env.DYNAMODB_ACCESS_KEY_ID!,
          DYNAMODB_SECRET_ACCESS_KEY: process.env.DYNAMODB_SECRET_ACCESS_KEY!,
          AWS_DEPLOYMENT_REGION: process.env.AWS_DEPLOYMENT_REGION!,
          PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME!,
          IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID!,
          USER_POOL_ENDPOINT: process.env.USER_POOL_ENDPOINT!,
          USER_POOL_CLIENT_ID: process.env.USER_POOL_CLIENT_ID!,
          USER_POOL_CLIENT_SECRET: process.env.USER_POOL_CLIENT_SECRET!,
          BUCKET_NAME: process.env.BUCKET_NAME!,
          USER_POOL_DOMAIN_URL: process.env.USER_POOL_DOMAIN_URL!,
          NEXT_PUBLIC_OAUTH_LOGIN_URL: process.env.NEXT_PUBLIC_OAUTH_LOGIN_URL!,
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
