
# NextJS Authentication Demo with Next-Auth Credentials with Backend in NestJS to provide AccessToken and Refresh Token

#### Technologies Used

- NextJS
- Next-Auth
- Tailwind CSS
- Axios
- Custom Hooks


In this demo you can get credentials authentication that makes request to a NestJS based backend https://github.com/manojsethi/nest_auth_demo_refresh_token 

Main thing to note in this demo is that we have avoided the usage of localStorage or cookies to get the AccessToken and RefreshToken. Instead we have used useSession hook provided by Next-Auth and create Custom Webhook for Axios Instance that utilizes useSession. RefreshToken after getting new token do updates the Next-Auth Session

**NOTE** - You need to clone https://github.com/manojsethi/nest_auth_demo_refresh_token as well to test the functionality built in this frontend.

## Usage/Examples Backend

```
npm i

npm run start:dev
```
API can be listened at localhost 3000

## Usage/Examples Frontend

```
npm i

npm run dev
```
Frontend port is set to 8080
