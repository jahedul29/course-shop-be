### Github URL: [https://github.com/jahedul29/course-shop-be](https://github.com/jahedul29/course-shop-be)

### Live URL: [https://course-shop-be.vercel.app](https://course-shop-be.vercel.app)

## Used Technologies:

**ExpressJs** (As nodejs framework)
**Postgresql** (As database)
**Prisma** (As ORM)
**Typescript**
**Zod** (For route level validation)
**Winston** (As logger)
**Bcrypt** (For password hashing)
**ts-node-dev** (For running typescript node application)
**http-status** (For http code)
**dotenv** (For env configuration)
**eslint** (For linting)
**prettier** (For formatting)
**lint-staged** (Run linters against staged git files and don't let 💩 slip into your code base!)
**husky** (Git hook before committing)

## How to run the application :

I used latest node version while developing the application `18.16.0` and used yarn for managing dependencies

1. Clone the application
   ```
   git clone https://github.com/jahedul29/course-shop-be
   ```
2. install required dependencies using yarn
   `yarn`
3. Then migrate prisma
   `npx prisma migrate dev`
4. Run the application
   `yarn dev`
5. To check the prisma studio, run
   `npx prisma studio`
   then prisma studio can be accessible from http://localhost:5555

## Available Endpoints

**Course**

- https://course-shop-be.vercel.app/api/v1/courses (POST) - to create a course (Admin)
- https://course-shop-be.vercel.app/api/v1/courses (GET) - to get the list of courses (Admin, Student)
- https://course-shop-be.vercel.app/api/v1/courses/:id (GET) - to get the details of course (Admin, Student)
- https://course-shop-be.vercel.app/api/v1/course/:id (PATCH) - to update course (Admin)
- https://course-shop-be.vercel.app/api/v1/course/:id (DELETE) - to delete course (Admin)

**Enrollment**

- https://course-shop-be.vercel.app/api/v1/enrollments/enroll-into-course/:courseId/:userId (POST) - to enroll a user into a course
- https://course-shop-be.vercel.app/api/v1/enrollments (Get) - to get all the enrollments (Admin will get all the items but student will only get the items where the logged in user enrolled in)
- https://course-shop-be.vercel.app/api/v1/enrollments/mark-course-as-complete/:courseId/:userId (POST) - to mark a course as complete

**Auth**

- https://course-shop-be.vercel.app/api/v1/register (POST) - to register a user
- https://course-shop-be.vercel.app/api/v1/login (POST) - to login to the application

**User**

- https://course-shop-be.vercel.app/api/v1/users (GET) - to get the list of users (Admin)
- https://course-shop-be.vercel.app/api/v1/users/:id (GET) - to get the specific user details (Admin)
- https://course-shop-be.vercel.app/api/v1/users/:id (PATCH) - to update user (Admin)
- https://course-shop-be.vercel.app/api/v1/users/:id (DELETE) - to delete a user (Admin)
