- Node Version : v18.7.0
- Environment setup
    * Environment variables
        USER=''       - user name of psql
        HOST=''       - localhost
        DB=''         - database name
        DB_PORT=''    - port number
        PASSWORD=''   - database password
        PORT=''       - server port
        TABLE=''      - table name
    * run - 'npm install'
    * run - 'npm start'

- API end points
    * /task/create: POST
        request body eg. {"name":"s22", "status":"active", "date":"2023-10-27"}
    * /task/get_tasks: GET
        query params- 'page' (0, 1, ...)
    * /task/get_task: GET
        query params- 'name' (task name)
    * /task/update: PATCH
        request body eg. {"name":"s22", "status":"active", "prevStatus":"PENDING"}