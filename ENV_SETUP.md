# Environment Variables Setup

This project uses environment variables for configuration. All variables are accessed through `src/lib/config.ts` to provide type safety and defaults.

## Quick Start

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. The `.env` file is already created with defaults - no changes needed for local development.

3. The `.env` file is automatically loaded by SvelteKit.

## Available Variables

### Database
- `DB_PATH` - Path to SQLite database file (default: `./database/budget_tracker.db`)

### Application
- `NODE_ENV` - Environment mode (default: `development`)
- `PORT` - Server port (default: `4176`)

### Security
- `DEFAULT_USER_ID` - Default user ID for single-user mode (default: `1`)

## Usage in Code

```typescript
import config from "$lib/config.js";

// Access environment variables
const dbPath = config.dbPath;
const userId = config.defaultUserId;

// Check environment
if (config.isDevelopment) {
  // Development-only code
}
```

## Production Deployment

When deploying to production:

1. Set environment variables in your hosting platform (Vercel, Railway, etc.)
2. Do NOT commit `.env` file (it's in `.gitignore`)
3. Commit `.env.example` as documentation

## Example: Railway Deployment

```bash
# Set environment variables via CLI
railway variables set DB_PATH=/data/budget_tracker.db
railway variables set NODE_ENV=production
railway variables set DEFAULT_USER_ID=1
```

## Example: Docker

Update `docker-compose.yml`:

```yaml
services:
  app:
    environment:
      - DB_PATH=/data/budget_tracker.db
      - NODE_ENV=production
      - DEFAULT_USER_ID=1
    volumes:
      - ./data:/data
```
