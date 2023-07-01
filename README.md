# Solar Energy System (solar-energy-system)

A project for Databases and Web Techniques

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

If you use backend API on separate server or on a specific port
change `baseURL` settings in ./src/boot/axios.


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Deploy production version
```bash
docker compose up -d --build
```
This command will build a webserver with nginx.
Before, please, check nginx configuration file in default.conf


