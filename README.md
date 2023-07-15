# Code-E
Online code runner

> Currently supports only python

### Docker command
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
| `POST` | `/submissions` | ```{ 'language', 'srcCode' }``` | Create a submission |
| `POST` | `/submissions/<id>` | - | Get submission information according to `id` |
