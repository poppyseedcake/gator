# Gator CLI

A RSS feed aggregator CLI application built with Node.js, TypeScript, and PostgreSQL.

## Requirements

To run this CLI, you need:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** database

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure the Application

Create a configuration file at `~/.gatorconfig.json` in your home directory with the following structure:

```json
{
  "db_url": "postgres://user:password@localhost:5432/gator",
  "current_user_name": "your_username"
}
```

- `db_url`: Your PostgreSQL connection string
- `current_user_name`: The username to use for commands that require authentication

### 3. Set Up the Database

Run migrations to create the necessary tables:

```bash
npm run migrate
```

## Running the CLI

Run commands using:

```bash
npm start -- <command> [args...]
```

Or directly with tsx:

```bash
npx tsx ./src/index.ts <command> [args...]
```

## Available Commands

### User Management

- **register** `<name>` - Create a new user and set as current user
  ```bash
  npm start -- register john
  ```

- **login** `<name>` - Switch to an existing user
  ```bash
  npm start -- login john
  ```

- **users** - List all registered users (current user marked with *)
  ```bash
  npm start -- users
  ```

### Feed Management

- **addfeed** `<name> <url>` - Add a new RSS feed (requires login)
  ```bash
  npm start -- addfeed TechCrunch https://techcrunch.com/feed/
  ```

- **feeds** - List all available feeds
  ```bash
  npm start -- feeds
  ```

- **follow** `<url>` - Follow a feed (requires login)
  ```bash
  npm start -- follow https://techcrunch.com/feed/
  ```

- **following** - List feeds you're following (requires login)
  ```bash
  npm start -- following
  ```

- **unfollow** `<url>` - Unfollow a feed (requires login)
  ```bash
  npm start -- unfollow https://techcrunch.com/feed/
  ```

### Aggregation

- **agg** - Fetch and aggregate posts from all followed feeds
  ```bash
  npm start -- agg
  ```

### Database

- **reset** - Reset the database (drops all tables)
  ```bash
  npm start -- reset
  ```

## Example Workflow

```bash
# 1. Register a new user
npm start -- register john

# 2. Add some RSS feeds
npm start -- addfeed TechCrunch https://techcrunch.com/feed/
npm start -- addfeed HN https://news.ycombinator.com/rss

# 3. Check your feeds
npm start -- feeds

# 4. Aggregate posts
npm start -- agg

# 5. List users
npm start -- users
```
