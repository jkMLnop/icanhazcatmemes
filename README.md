# icanhazcatmemes Frontend

## Running the Project

To run this project, use the following command in the project directory:

```bash
docker system prune -af && docker pull node:18-alpine && docker-compose down && docker-compose build --no-cache frontend && docker-compose up --build
```