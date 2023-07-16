# Code-E
Online code runner

> **Warning** : Import the [init.json](./mongo-seed/init.json) to language collection of your mongo database (no need to import if using `docker compose`)

### Docker command
- Build docker image
```bash
docker build -t code-e .
```
- Run docker container
```bash
docker run --rm -d \
-e MONGO_URI="<Your mongo URI>" \
-e JWT_SECRET="<JWT Secret>" \
-e PYTHON_PATH="/bin/python3" \
code-e
```

## API Documentaion
| Method | API Endpoint | API Body | Description |
| ------------- | ------------- | ------------- | ------------- |
| `POST` | `/users/signup` | ```{ 'email', 'password' }``` | Creates a new user |
| `POST` | `/users/signin` | - | login with existing user |
| `POST` | `/submissions` | ```{ 'languageId', 'srcCode' }``` | Create a submission |
| `POST` | `/submissions/<id>` | - | Get submission information according to `id` |
| `GET` | `/languages` | - | Get all available language information |
