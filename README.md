# API Give
API Give is a project that provide open API for third parties to can work with https://giveth.io (https://github.com/Giveth/impact-graph)

[Used Technologies](#Used_Technologies)

[Installation](#Installation)

[Test](#Test)

[Logs](#Logs)

[Migrations](#Migrations)

[Architecture](#Architecture)

[You want to use our API right now?](#Staging_Guide)

[References](#References)

### Used_Technologies
* Nodejs **v16**
* Typescript **v4.5.2**
* DB: postgres **v14.2**
* DB ORM: TypeORM **v0.3.6**
* Redis **v5.0.9**
* API protocol : REST
* Web application: Express **v4.17.3**
* Deployment: docker-compose **v3.3**
* API Documentation: Swagger
* Test framework: Mocha **v9.2.2**
* CI/CD tools : [GitHub Actions](https://github.com/Giveth/apiGive/blob/staging/.github/workflows/CI-CD.yml)

### Installation and Run

* `git clone git@github.com:Giveth/apiGive.git`
* `cd apiGive`
* `npm ci`
* Bringing up database, you can install that in other way, but I suggest
  using docker `docker-compose -f docker-compose-local-postgres-redis.ym up -d`
* Creat a file named `development.env` based on [Env example file](./config/example.env) and put it in `./config`
* Run [Migrations](#Migrations)
* `npm start`
* Now you can browse [Swagger](http:localhost:3040/docs)
* If you ran migrations successfully then you are able to login in  [Admin panel](http:localhost:3040/admin) username: **test-admin@giveth.io** password: **12345**

### Test
You should have a postgress instance up in order to running tests so you can use  [Local DB docker-compose](./docker-compose-local-postgres-redis.ym)
* `npm run test`

### Logs

In localhost and test we put logs in console and file but in production and staging we just use file for writing logs You can see logs beautifully with this command

* `npm i -g bunyan`
* `tail -f logs/apiGive.log | bunyan`

### Migrations

#### Create new Migration file

```
typeorm migration:create ./migrations/createAccessTokenTable
```


#### Then you need to run the migrations like so

```
npm run db:migrate:run:local
```

#### If you want to revert last migration

```
npm run db:migrate:revert:local
```

### Architecture

You can see [Entities Diagram](./diagrams/main_flow.md) to get insight about entities

### Staging_Guide
If you want to use our API in staging ENV, you have to do these steps:
* You can ask us in [Discord](https://discord.com/channels/679428761438912522/861692942645067777) to create an application for you, and give you the **username** and secret of your **application**
* Then you can go to https://staging.apigive.giveth.io/docs/#/Token/GenerateAccessToken and get access token (there is **lock** icon in right 
of url section, you should click on that and insert the **username** and **secret** that we gave you)
* copy the generated access token and use it in further donations for instance https://staging.apigive.giveth.io/docs/#/Donation/CreateDonation
  (There is **lock** icon in right of url section, you should fill it with **Bearer {yourAccessToken}**)

If you are a giveth contributor you can access to admin panel ( for creating application/organizations and viewing logs, ...), so you need to these steps
* Ask us to create a **VPN** for you in [Discord](https://discord.com/channels/679428761438912522/861692942645067777)
* Ask us to create an admin user for you, with your email in [Discord](https://discord.com/channels/679428761438912522/861692942645067777)
* Then you can go to https://staging.apigive.giveth.io/admin (your VPN should be connected otherwise you will get 403 error)
* Login with your email and password ( that you gave use before to create admin user for you)

## References

I used these articles for writing project

* https://blog.logrocket.com/linting-typescript-using-eslint-and-prettier

* https://rsbh.dev/blog/rest-api-with-express-typescript
