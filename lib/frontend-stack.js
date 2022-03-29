"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendStack = void 0;
const s3 = require("aws-cdk-lib/aws-s3");
const s3deploy = require("aws-cdk-lib/aws-s3-deployment");
const cloudfront = require("aws-cdk-lib/aws-cloudfront");
const iam = require("aws-cdk-lib/aws-iam");
const aws_cdk_lib_1 = require("aws-cdk-lib");
class FrontendStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
            websiteErrorDocument: "index.html",
            websiteIndexDocument: "index.html",
        });
        const websiteIdentity = new cloudfront.OriginAccessIdentity(this, "WebSiteIdentity");
        const webSiteBucketPolicyStatement = new iam.PolicyStatement({
            actions: ["s3:GetObject"],
            effect: iam.Effect.ALLOW,
            principals: [websiteIdentity.grantPrincipal],
            resources: [`${websiteBucket.bucketArn}/*`],
        });
        websiteBucket.addToResourcePolicy(webSiteBucketPolicyStatement);
        const websiteDistribution = new cloudfront.CloudFrontWebDistribution(this, "WebsiteDistribution", {
            errorConfigurations: [
                {
                    errorCachingMinTtl: 300,
                    errorCode: 403,
                    responseCode: 200,
                    responsePagePath: "/index.html",
                },
                {
                    errorCachingMinTtl: 300,
                    errorCode: 404,
                    responseCode: 200,
                    responsePagePath: "/index.html",
                },
            ],
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: websiteBucket,
                        originAccessIdentity: websiteIdentity,
                    },
                    behaviors: [
                        {
                            isDefaultBehavior: true,
                        },
                    ],
                },
            ],
            priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
        });
        new s3deploy.BucketDeployment(this, "WebsiteDeploy", {
            sources: [s3deploy.Source.asset("frontend/build")],
            destinationBucket: websiteBucket,
            distribution: websiteDistribution,
            distributionPaths: ["/*"],
        });
    }
}
exports.FrontendStack = FrontendStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udGVuZC1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBeUM7QUFDekMsMERBQTBEO0FBQzFELHlEQUF5RDtBQUN6RCwyQ0FBMkM7QUFDM0MsNkNBQWdEO0FBR2hELE1BQWEsYUFBYyxTQUFRLG1CQUFLO0lBQ3RDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxhQUFhLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDekQsb0JBQW9CLEVBQUUsWUFBWTtZQUNsQyxvQkFBb0IsRUFBRSxZQUFZO1NBQ25DLENBQUMsQ0FBQztRQUVILE1BQU0sZUFBZSxHQUFHLElBQUksVUFBVSxDQUFDLG9CQUFvQixDQUN6RCxJQUFJLEVBQ0osaUJBQWlCLENBQ2xCLENBQUM7UUFFRixNQUFNLDRCQUE0QixHQUFHLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUMzRCxPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDekIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSztZQUN4QixVQUFVLEVBQUUsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO1lBQzVDLFNBQVMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLFNBQVMsSUFBSSxDQUFDO1NBQzVDLENBQUMsQ0FBQztRQUVILGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxVQUFVLENBQUMseUJBQXlCLENBQ2xFLElBQUksRUFDSixxQkFBcUIsRUFDckI7WUFDRSxtQkFBbUIsRUFBRTtnQkFDbkI7b0JBQ0Usa0JBQWtCLEVBQUUsR0FBRztvQkFDdkIsU0FBUyxFQUFFLEdBQUc7b0JBQ2QsWUFBWSxFQUFFLEdBQUc7b0JBQ2pCLGdCQUFnQixFQUFFLGFBQWE7aUJBQ2hDO2dCQUNEO29CQUNFLGtCQUFrQixFQUFFLEdBQUc7b0JBQ3ZCLFNBQVMsRUFBRSxHQUFHO29CQUNkLFlBQVksRUFBRSxHQUFHO29CQUNqQixnQkFBZ0IsRUFBRSxhQUFhO2lCQUNoQzthQUNGO1lBQ0QsYUFBYSxFQUFFO2dCQUNiO29CQUNFLGNBQWMsRUFBRTt3QkFDZCxjQUFjLEVBQUUsYUFBYTt3QkFDN0Isb0JBQW9CLEVBQUUsZUFBZTtxQkFDdEM7b0JBQ0QsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLGlCQUFpQixFQUFFLElBQUk7eUJBQ3hCO3FCQUNGO2lCQUNGO2FBQ0Y7WUFDRCxVQUFVLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxlQUFlO1NBQ2xELENBQ0YsQ0FBQztRQUVGLElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDbkQsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNsRCxpQkFBaUIsRUFBRSxhQUFhO1lBQ2hDLFlBQVksRUFBRSxtQkFBbUI7WUFDakMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBakVELHNDQWlFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHMzIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtczNcIjtcbmltcG9ydCAqIGFzIHMzZGVwbG95IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtczMtZGVwbG95bWVudFwiO1xuaW1wb3J0ICogYXMgY2xvdWRmcm9udCBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3VkZnJvbnRcIjtcbmltcG9ydCAqIGFzIGlhbSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWlhbVwiO1xuaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5cbmV4cG9ydCBjbGFzcyBGcm9udGVuZFN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHdlYnNpdGVCdWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsIFwiV2Vic2l0ZUJ1Y2tldFwiLCB7XG4gICAgICB3ZWJzaXRlRXJyb3JEb2N1bWVudDogXCJpbmRleC5odG1sXCIsXG4gICAgICB3ZWJzaXRlSW5kZXhEb2N1bWVudDogXCJpbmRleC5odG1sXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCB3ZWJzaXRlSWRlbnRpdHkgPSBuZXcgY2xvdWRmcm9udC5PcmlnaW5BY2Nlc3NJZGVudGl0eShcbiAgICAgIHRoaXMsXG4gICAgICBcIldlYlNpdGVJZGVudGl0eVwiXG4gICAgKTtcblxuICAgIGNvbnN0IHdlYlNpdGVCdWNrZXRQb2xpY3lTdGF0ZW1lbnQgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbXCJzMzpHZXRPYmplY3RcIl0sXG4gICAgICBlZmZlY3Q6IGlhbS5FZmZlY3QuQUxMT1csXG4gICAgICBwcmluY2lwYWxzOiBbd2Vic2l0ZUlkZW50aXR5LmdyYW50UHJpbmNpcGFsXSxcbiAgICAgIHJlc291cmNlczogW2Ake3dlYnNpdGVCdWNrZXQuYnVja2V0QXJufS8qYF0sXG4gICAgfSk7XG5cbiAgICB3ZWJzaXRlQnVja2V0LmFkZFRvUmVzb3VyY2VQb2xpY3kod2ViU2l0ZUJ1Y2tldFBvbGljeVN0YXRlbWVudCk7XG5cbiAgICBjb25zdCB3ZWJzaXRlRGlzdHJpYnV0aW9uID0gbmV3IGNsb3VkZnJvbnQuQ2xvdWRGcm9udFdlYkRpc3RyaWJ1dGlvbihcbiAgICAgIHRoaXMsXG4gICAgICBcIldlYnNpdGVEaXN0cmlidXRpb25cIixcbiAgICAgIHtcbiAgICAgICAgZXJyb3JDb25maWd1cmF0aW9uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVycm9yQ2FjaGluZ01pblR0bDogMzAwLFxuICAgICAgICAgICAgZXJyb3JDb2RlOiA0MDMsXG4gICAgICAgICAgICByZXNwb25zZUNvZGU6IDIwMCxcbiAgICAgICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6IFwiL2luZGV4Lmh0bWxcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVycm9yQ2FjaGluZ01pblR0bDogMzAwLFxuICAgICAgICAgICAgZXJyb3JDb2RlOiA0MDQsXG4gICAgICAgICAgICByZXNwb25zZUNvZGU6IDIwMCxcbiAgICAgICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6IFwiL2luZGV4Lmh0bWxcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBvcmlnaW5Db25maWdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgczNPcmlnaW5Tb3VyY2U6IHtcbiAgICAgICAgICAgICAgczNCdWNrZXRTb3VyY2U6IHdlYnNpdGVCdWNrZXQsXG4gICAgICAgICAgICAgIG9yaWdpbkFjY2Vzc0lkZW50aXR5OiB3ZWJzaXRlSWRlbnRpdHksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmVoYXZpb3JzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpc0RlZmF1bHRCZWhhdmlvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcHJpY2VDbGFzczogY2xvdWRmcm9udC5QcmljZUNsYXNzLlBSSUNFX0NMQVNTX0FMTCxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgbmV3IHMzZGVwbG95LkJ1Y2tldERlcGxveW1lbnQodGhpcywgXCJXZWJzaXRlRGVwbG95XCIsIHtcbiAgICAgIHNvdXJjZXM6IFtzM2RlcGxveS5Tb3VyY2UuYXNzZXQoXCJmcm9udGVuZC9idWlsZFwiKV0sXG4gICAgICBkZXN0aW5hdGlvbkJ1Y2tldDogd2Vic2l0ZUJ1Y2tldCxcbiAgICAgIGRpc3RyaWJ1dGlvbjogd2Vic2l0ZURpc3RyaWJ1dGlvbixcbiAgICAgIGRpc3RyaWJ1dGlvblBhdGhzOiBbXCIvKlwiXSxcbiAgICB9KTtcbiAgfVxufVxuIl19