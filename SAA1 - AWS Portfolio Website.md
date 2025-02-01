# SAA1 Capstone Project 1: AWS Portfolio Website

## Overview and Objectives

**Project Overview:**

Welcome to the capstone project on building a server-based resume (CV) and AWS Latest News website.  When completed, you should have a website built using several AWS technologies that are perfect for showing your skill and knowledge as an AWS architect and engineer.  

In this capstone, there will be setup steps you must complete as you are developing the solution.  You will find these in the **Prerequisite and Setup** section below.

**Note:** If you need any help or assistance while attempting this capstone, see the Help section at the bottom for guidance.

---

---

---

# The `Project Brief`

The customer, a start-up known as exampleCorp, is in the process of migrating their AWSPortolio website into the cloud. They have been running this application as a monolithic app for the past ten years, on a single server with all of the code and the functionality bundled on a single server running in a server in the head office.

For many reasons, including performance issues, the cost of operating and managing the server, and technical debt - exampleCorp has decided to migrate this application to the cloud. Anytime they needed to make a change to the website, they would accrue many hours of downtime whilst they gained access to the web server and made their changes - and because of the application's monolithic nature, any changes were fraught with risk - could this change in one aspect of the application cause a problem in the rest of the application? This needed to change.

Their in-house software development team has taken the application code and separated it into the main website files (HTML, css, javascript for server-side functionality) and split out the microservices (AWS Latest news page, Blog Post addition service, View Counter and the Contact Form) into CloudFormation templates including services like Lambda, DynamoDB, and Amazon Eventbridge. They have also taken the application code and put it onto an Amazon Machine Image (AMI).

Your job as the migration lead is to bring up the application on AWS and integrate the EC2-based website with the microservices and APIs. Additionally, the company wants to ultimately reduce costs and migrate all application components to serverless services. 

Therefore, there are two stages to the project:

## Stage 1 - Migrate to a server-based highly available website

In stage 1 you must deploy the web application in a highly available server-based deployment.

**Key Objectives & Requirements:**

- Take the AMI and deploy the application on it, which is highly scalable, fault-tolerant, and well-architected - using services like Application Load Balancers, CloudFront, and Route 53 for DNS resolution. 

- Integrate the microservices into the web application using the code for these services without embedding them into the web servers themselves. 

- Securely do this - i.e., no public IP addresses on the EC2 instances, effective use of Security groups, using the principle of least privilege, etc. 

## Stage 2 - Migrate the website to serverless infrastructure

In stage 2 you must migrate the web application onto to an S3 static website.

**Key Objectives & Requirements:**

- Migrate the website assets to an S3 bucket configured as a static website.

- Update the CloudFront distribution ensuring that a custom domain name is maintained for the website.

- Update Amazon Route 53 records.


## Team Approach versus Individual Approach

In this capstone, you can work as part of a team or individually.

**Team Approach:**

Opting for a team-based approach to the capstone project brings the benefits of collaboration, diversified skill sets, and shared responsibility. Working as part of a team allows for the pooling of knowledge, expertise, and resources, fostering creativity, innovation, and problem-solving capabilities. Each team member can contribute unique perspectives and insights, leading to more robust and comprehensive solutions. Collaboration also promotes effective communication, task delegation, and mutual support, enhancing overall project efficiency and effectiveness. However, coordinating schedules, managing differing opinions, and ensuring equitable contributions are important considerations when working in a team. Despite these challenges, the collective efforts of a well-functioning team can lead to greater success, shared achievements, and a rewarding collaborative experience.

**Individual Approach:**

Undertaking the capstone project individually offers the opportunity for full autonomy and accountability throughout the project lifecycle. As a solo participant, you will be free to make independent decisions, manage all aspects of the solution design and implementation, and take ownership of the project's success. Working individually allows for focused attention to detail, personalized learning experiences, and the flexibility to tailor the solution to individual preferences and strengths. However, it also requires self-discipline, time management skills, and the ability to handle challenges independently. While working alone may lack the collaborative dynamics of team work, it offers a chance for personal growth, skill development, and the satisfaction of completing a project from start to finish.


### Documentation

It is highly recomended that you document your journey through this exercise. The deployed application serves as a good way to demonstrate your skills as part of your project portfolio. Documenting the journey is another great way to showcase your experience online. Consider creating articles you can publish on platforms such as LinkedIn and Medium.


## Prerequisites and Setup

**Important:** Ensure you are in the "N. Virginia" AWS Region, "us-east-1".

### Step-by-step setup

These instructions will walk you through configuring your AWS environment to support this capstone and building a solution that meets the requirements of exampleCorp.

#### Step 1 - Deploy the AMI

The first step is to take the public ami (2025-Portfolio ami-0ef1acfe3add4a816, you'll find it under community AMIs) and launch an instance from this AMI. If you SSH into your machine and go to the /var/www/html directory, you should see there are several website files waiting for you to interact with:

- index.html
- index.js
- blog.html
- blog.js
- aws.html 
- aws.js
- certs.html
- style.css
- architectassociate.png
- cloudpractitioner.png

Feel free to look around at your initial webpage by going to the public IP of your instance.

This web server now has all of the server-side web application code for you to start building upon to add functionality to the webpage.

The only page you can update if you want to at this point is the `certs.html` page. If you look into the file by using the following command:

```bash
nano certs.html
```

You'll see that there is a section where you can add certificates, for example:

```html
<div class="certification">
    <img src="cloudpractitioner.png" alt="AWS Cloud Practitioner Badge" class="certification-badge">
    <h3 class="certification-title">AWS Certified Cloud Practitioner</h3>
</div>
```

You'll see that it is refering to a Cloud Practitioner badge, which refers to the badge through the `img src`, `alt`, and the `h3` tag. 

Copy this entire block, the entire div and replicate it for as many certifications you have. Please change the placeholders in text, and in the `img` section, this needs to point to the path of a local image file of the certification you want to display on your page.

The easiest way to get an image on your page is to first;

1. Upload the image to S3
2. Assign the appropriate S3 permissions to the EC2 instance
3. Run the following command to copy the file from S3 to our `/var/www/html/`directory

Do this for as many ceritifcations as you want to display - when you leave nano and do a hard refresh on the browser (CTRL + Shift + R) it should display the image. If it doesn't, it must be either:

- not in the /var/www/html directory
- not named properly in the `<img src=` section

Refer to the example above.


You then need to launch the 'Microservice' stacks, all of which include event-driven or serverless components, which will be used to increase the functionality of the website. Feel free to look into each stack to see the components and the Lambda code to try to understand what's going on in the stack. Once they are deployed, you will create various endpoints (API / Function URLS) and embed these into the application code on the EC2 instances. 

This will allow the end users to interact with the microservices in AWS by using the website. 


#### Step 2 - Deploy CloudFormation stacks

The next step is to install all the CloudFormation stacks (in any order), ensuring you are in the AWS Region us-east-1 region.  You can write any value you like for any parameters you are asked to include.


#### Step 3 - Creating microservice endpoints

> NOTES: The Google Chrome developer tools will be very useful when troubleshooting.  Be wary of the fact that when you update a web server file, it may not immediately be reflected on the pages (especially when viewing JavaScript files, as web browsers often cache these files).  If you make changes to the site and do not see any changes in your browser, the browser shows you cached files.  To remove the cache, right-click on the refresh button within developer tools and click 'Empty cache and hard reload.'  This will test any latest changes on your browser.
 

##### Blog Microservice


1. Setup a HTTP API with a GET method integrated with the **FetchPostFunction** Lambda function. Enable CORS and as follows;

- Access-Control-Allow-Origin = *
- Access-Control-Allow-Headers = *
- Access-Control-Allow-Methods = *
- Access-Control-Expose-Headers = *

Add the invoke URL to your application code (line 6 in the file blog.js).

2. After the initial stack creation, update the Upload Bucket to add the Event notification for triggering the **CreatePostFunction** Lambda function. This sets the S3 event notification for the Lambda function and allows the microservice to work. (**TIP:**  It should only work when .txt files are uploaded using the API call **S3:PutObject** events, triggering the **CreatePostFunction** function. 

***Note*** if you are struggling to get this to work, create a function url by following steps of the subsequent steps later in the document. 

##### View Counter

You must set up a Lambda function URL, with CORS enabled as a trigger for the **ViewsFunction** Lambda function.

> Note: for each Lambda function URL in the solution you can set the authentication type to "NONE". Also, CORS should be enabled, to expose all headers, allow all headers, and allow all methods).

Take the time to explore these settings, as multiple HTTP Methods are involved. Expose all headers and allow all headers too.

You will then add this to your application code (line 3 in the file **index.js**, replace the example URL). You can test the function URL works simply by clicking on it - if it does, add it in your **index.js** file. 

##### Contact Form

Again, use a function URL (CORS enabled, expose all headers, allow all headers, and allow all methods). Update line 34 in the index.js file.

##### AWS Latest News

Use a function URL for the **UpdateWebpageFunction** Function (CORS enabled, expose all headers, allow all headers, and allow all methods). Update line 2 of the aws.js file.  

>  **Note:** It's worth running a manual test on the RSS Lambda function before you add the microservice to your webpage. This will populate the DynamoDB table with news stories.  Otherwise, your page will be blank until the EventBridge rule runs for the first time, which will be 9 AM UTC. 

#### Testing

At this point you should be able to test the functionality of the website. If this works, create a new AMI using this instance. Then when you create new instances from this AMI it will have the images, all the API endpoints and any other customizations ready to go for when you build out the rest of your website architecture. AMIs can be used in launch templates, Autoscaling groups etc - so this is the next step to ensure your website is customized properly. 

***REMEMBER*** if you delete the cloudformation stacks, you'll have to re-edit the application code with the new API endpoints etc. 


#### Step 4 - Build out full network architecture (VPC, ALB, SGs, etc)

You can now follow the target architectural diagram and build a fully operational, scalable, well-architected application. This should include the Auto Scaling group, Application Load Balancer, CloudFront distribution, and Route 53 domain.


##### Step 5 - Migrate to a serverless website

Once you have fully tested the server-based deployment and validated full functionality you can proceed to migrate the website to a fully serverless solution using an S3 static website.


## Assistance & Getting Help

You can always find assistance available for your cohort in the Slack channels.  Additionally, you can message me on Slack or jack@cumulus-consulting.cloud if you have any questions. 


## Additional Challenge

If you are looking for more of a challenge, you can build a REST API endpoint with multiple resources and methods to have a single API for all of the microservice endpoints. This does take a deeper understanding of APIs, CORS, and software architecture.  If not, don't worry; the simple HTTP API / Function URLs within the instructions will work, too. 