# Mini URL Shortener API

Production-style mini URL shortener built with Node.js and Express. The app is intentionally small, but now includes test coverage, containerization, CI/CD skeleton, Terraform for AWS ECS Fargate, and documentation for portfolio use.

## What is included

- Short URL creation and redirect
- Health endpoint and structured request logs
- Node.js built-in tests
- Dockerfile and docker-compose for local runs
- GitHub Actions workflows for CI, deploy, infra, and release automation
- Terraform for AWS ECS Fargate + ECR + ALB using an existing VPC/subnets
- Architecture and pipeline docs in `docs/`

## Repo layout

```text
.
├── .github/workflows/
├── docs/
├── infra/terraform/
├── src/
├── tests/
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Local run

```bash
npm install
npm run dev
```

## Test and lint

```bash
npm test
npm run lint
```

## Docker

```bash
docker build -t mini-url-shortener-api .
docker run --rm -p 3000:3000 -e BASE_URL=http://localhost:3000 mini-url-shortener-api
```

Or use compose:

```bash
docker compose up --build
```

## API endpoints

- `GET /health`
- `POST /api/urls`
- `GET /api/urls`
- `GET /api/urls/:code`
- `DELETE /api/urls/:code`
- `GET /r/:code`

## AWS deployment model

Default target: AWS ECS Fargate + ECR + ALB.

This repo uses an existing VPC and subnet IDs passed to Terraform. That keeps the stack smaller for a portfolio project while still showing a real ECS/Fargate deployment pattern.

## Security and secrets

- Do not hardcode AWS credentials.
- Store AWS keys, region, ECS cluster/service, and ECR repository in GitHub Secrets.
- Use GitHub Environments for prod approval gates.

## Documentation

- [Architecture](docs/architecture.md)
- [CI/CD pipeline](docs/pipeline.md)
- [Terraform notes](infra/terraform/README.md)

## Trade-offs

- The app still uses in-memory storage, so it is suitable for demo and portfolio flow, but not for horizontal scaling or persistence across task restarts.
- The Terraform stack expects an existing VPC to avoid overcomplicating the repo with full network provisioning.
- Release automation is kept lightweight and tag-based.

## Demo endpoint

When deployed, publish the ALB DNS name or custom domain here.