# Deployment Guide

**Project:** Smart CRM – Mekong Mobile  
**Repository:** https://github.com/Q-Tram/cdtn1-nguyenngocquynhtram-l2  
**Release:** v1.0

## 1. Requirements

The project uses Docker Compose to run a Node.js application and a PostgreSQL database.

**Required environment:**

- Operating system: Windows 10/11 (64-bit), Linux, or macOS.
- Docker Desktop on Windows, or Docker Engine with Docker Compose plugin on Linux/macOS.
- Tested versions: Docker Engine 29.9.3 and Docker Compose 5.7.0.
- Git for cloning the repository.
- At least 2 GB of free disk space is recommended for Docker images and database storage.
- Available ports: `3000` (application) and `5432` (PostgreSQL).

The application uses Node.js 20 and PostgreSQL 16. Both runtime environments are provided by Docker images. Installing Node.js or PostgreSQL directly on the host machine is not required.

## 2. Setup Steps

Run each command separately from a terminal.

### Step 1: Clone the repository

```cmd
git clone --branch v1.0 https://github.com/Q-Tram/cdtn1-nguyenngocquynhtram-l2.git
```

### Step 2: Enter the project directory

```cmd
cd cdtn1-nguyenngocquynhtram-l2
```

### Step 3: Create the environment file

Windows CMD:

```cmd
copy .env.example .env
```

Linux/macOS:

```bash
cp .env.example .env
```

### Step 4: Build and start the application

```bash
docker compose up -d --build
```

Docker Compose automatically builds the application image, pulls PostgreSQL 16, creates the network and persistent volume, initializes the database, loads sample data, and starts the application after the database becomes healthy.

## 3. Environment Variables

The following table describes the environment variables used by the project.

| Variable | Sample Value | Description | Required? |
|---|---|---|---|
| DB_HOST | db | PostgreSQL service hostname inside Docker | No – set by Docker Compose |
| DB_PORT | 5432 | PostgreSQL port | No – set by Docker Compose |
| DB_NAME | cdtn1_nguyenngocquynhtram_l2 | Database name | No – Compose default |
| DB_USER | postgres | Database username | No – Compose default |
| DB_PASSWORD | postgres | Database password | No – Compose default; change for production |
| PORT | 3000 | Application listening port | No – set by Docker Compose |
| JWT_SECRET | Not configured | Reserved for JWT authentication; not currently used | No – currently unused |

Docker Compose provides default values when database variables are empty or unset. The application port and database host/port are configured directly in the Compose file.

For local deployment, the default configuration is sufficient. For production deployment, replace default database credentials with secure values. Never commit the `.env` file to version control.

## 4. Sample Data

Sample data is loaded automatically during the first database initialization.

**Initialization files:**

- `database/migrations/001_init.sql`: Creates the database tables and initial issue categories.
- `database/seeds/001_seed.sql`: Inserts sample customers, devices, issue categories, warranty tickets, and ticket status logs.

No manual SQL execution is required for the initial deployment.

After initialization, the expected sample data counts are:

| Table | Expected Records |
|---|---:|
| customer | 3 |
| device | 3 |
| issue_category | 3 |
| ticket | 3 |
| ticket_status_log | 3 |

To verify the sample data, run:

```cmd
docker compose exec -T db psql -U postgres -d cdtn1_nguyenngocquynhtram_l2 -c "SELECT 'customer' AS table_name, COUNT(*) FROM customer UNION ALL SELECT 'device', COUNT(*) FROM device UNION ALL SELECT 'issue_category', COUNT(*) FROM issue_category UNION ALL SELECT 'ticket', COUNT(*) FROM ticket UNION ALL SELECT 'ticket_status_log', COUNT(*) FROM ticket_status_log;"
```

Each table should contain 3 records after the initial seed operation.

**Note:** PostgreSQL initialization scripts run automatically only when the data directory is empty. Existing database volumes are preserved across normal container restarts. Running `docker compose down -v` removes the database volume and its stored records.

## 5. Verify It Works

Run the following commands from the project directory.

### 5.1 Check container health

```cmd
docker compose ps
```

Expected result:

- `l2-postgres`: Up (healthy)
- `l2-app`: Up (healthy)

### 5.2 Check application health

```cmd
curl -s http://localhost:3000/health
```

Expected response:

```json
{"status":"ok"}
```

### 5.3 Check database connectivity

```cmd
curl -s http://localhost:3000/health/db
```

Expected response contains:

```json
{
  "status": "ok",
  "database": "connected"
}
```

### 5.4 Verify sample data

Run the SQL count command in Section 4. Each of the five tables should contain 3 records.

### 5.5 Run the automated test suite

```cmd
docker compose exec app npm test
```

Expected result: 10 tests pass with zero failures.

### 5.6 Access the application

Open the following URL in a web browser:

http://localhost:3000

### 5.7 Stop the application

```cmd
docker compose down
```

To remove containers and the database volume:

```cmd
docker compose down -v
```

**Warning:** The `-v` option permanently removes the PostgreSQL data volume, including stored database records.