# CSYE 6225 - Spring 2019

## Team Information

| Name | NEU ID | Email Address |
| --- | --- | --- |
| Mengying Wang | 001357559 | wang.mengyin@husky.neu.edu |
| Shiyu Wang | 001400142 | wang.shiyu3@husky.neu.edu |
| Zhichao Pan | 001493794 | pan.z@husky.neu.edu |

## Technology Stack
* Operating System
  * [Ubuntu 18.04](http://releases.ubuntu.com/bionic/)
* Programming Language
  * [Node.js](https://nodejs.org/en/)
* Develop Tools
  * [WebStorm](https://www.jetbrains.com/webstorm/)
  * [Git](https://git-scm.com)
* Relational Database
  * [MySQL](https://www.mysql.com)
* Object Storage
  * [AWS](https://aws.amazon.com)
* Test Tools
  * [Supertest](https://www.npmjs.com/package/supertest)
  * [AVA](https://github.com/avajs)
  * [Travis CI](https://travis-ci.org)

## Build Instructions
* Clone the git repository from GitHub:
```
# For devs over HTTPS:
git clone https://github.com/omnip620/csye6225-spring2019.git

# For devs over SSH:
git clone git@github.com:omnip620/csye6225-spring2019.git
```
* Open the working directory:
```bash
cd ./../webapp/
   ```
* Install dependencies:
```bash
npm install
   ```
* Run
```bash
npm start
   ```
## Deploy Instructions
* After unit test success it will be deployed to specified AWS EC2 automatically
## Running Tests
* Do the first three steps in "Build Instructions" first.
* Run tests:
```bash
npm run test
   ```

## CI/CD
- Using travis as Continuous Integration
- Using travis as Continuous Delivery


