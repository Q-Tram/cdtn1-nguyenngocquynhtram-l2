

\# Deployment Guide



\## 1. Requirements



The project uses Docker Compose to run the Node.js application and PostgreSQL database.



Required software:



\- Docker Desktop with Docker Engine running (Windows).

\- Docker Engine and Docker Compose plugin (Linux/macOS).

\- Git for cloning the repository.

\- Available ports: `3000` (application) and `5432` (PostgreSQL).



The application uses Node.js 20 and PostgreSQL 16. These runtime environments are provided by Docker images, so installing Node.js or PostgreSQL directly on the host machine is not required.



\## 2. Setup Steps



\### Step 1: Clone the repository



```bash

git clone --branch v1.0 https://github.com/Q-Tram/cdtn1-nguyenngocquynhtram-l2.git

cd cdtn1-nguyenngocquynhtram-l2

```



\### Step 2: Create the environment file



Windows CMD:



```cmd

copy .env.example .env

```



Linux/macOS:



```bash

cp .env.example .env

```



\### Step 3: Build and start the application



Run:



```bash

docker compose up -d --build

```



Docker Compose automatically:

\- Builds the Node.js application image.

\- Pulls the PostgreSQL 16 image.

\- Creates the Docker network and persistent database volume.

\- Initializes the database using the migration SQL file.

\- Loads sample data using the seed SQL file.

\- Starts the application after PostgreSQL becomes healthy.



\## 3. Environment Variables



The project uses the following environment variables:



| Variable | Default Value | Description |

|---|---|---|

| DB\_HOST | db | PostgreSQL service hostname inside Docker |

| DB\_PORT | 5432 | PostgreSQL port |

| DB\_NAME | cdtn1\_nguyenngocquynhtram\_l2 | Database name |

| DB\_USER | postgres | Database username |

| DB\_PASSWORD | postgres | Database password |

| PORT | 3000 | Application port |

| JWT\_SECRET | Not configured | Not currently used by the application |



Docker Compose provides default values for database configuration when variables are empty or unset.



For local development, the default configuration is sufficient. For production deployment, replace default credentials with secure values and do not commit `.env` to version control.



\## 4. Sample Data



The database is initialized automatically when the PostgreSQL data volume is created for the first time.



Initialization files:



\- `database/migrations/001\_init.sql`: Creates the database tables and initial issue categories.

\- `database/seeds/001\_seed.sql`: Inserts sample customers, devices, issue categories, tickets, and ticket status logs.



The sample data includes records for:



\- Customers

\- Devices

\- Issue categories

\- Warranty tickets

\- Ticket status logs



No manual SQL execution is required for the initial deployment.



Note: PostgreSQL initialization scripts run automatically only when the data directory is empty. Existing database volumes are preserved across normal container restarts.



\## 5. Verify It Works



Run the following commands from the project directory.



\### 5.1 Check container health



```bash

docker compose ps

```



Expected result:

\- `l2-postgres`: Up (healthy)

\- `l2-app`: Up (healthy)



\### 5.2 Check application health



```bash

curl -s http://localhost:3000/health

```



Expected response:



```json

{"status":"ok"}

```



\### 5.3 Check database connectivity



```bash

curl -s http://localhost:3000/health/db

```



Expected response contains:



```json

{

&#x20; "status": "ok",

&#x20; "database": "connected"

}

```



\### 5.4 Run the automated test suite



```bash

docker compose exec app npm test

```



Expected result: all automated unit tests pass with zero failures.



\### 5.5 Access the application



Open the following URL in a web browser:



http://localhost:3000



\### 5.6 Stop the application



```bash

docker compose down

```



To remove containers and the database volume, run:



```bash

docker compose down -v

```



Warning: The `-v` option permanently removes the PostgreSQL data volume, including stored database records.



