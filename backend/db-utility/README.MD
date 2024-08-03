# README.md

## Database Backup and Restore Utility

This utility allows you to perform database dump (backup) and restore operations. It uses environment-specific configuration files to determine database connection parameters.

### Prerequisites

- Node.js installed on your machine.
- `dotenv` package installed.
- MySQL installed and accessible.

### Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.

### Configuration

Create environment-specific configuration files:

1. `.env.local` - for local environment configuration.
2. `.env.server` - for server environment configuration.

Each configuration file should contain the following variables:

- `MYSQL_DATABASE`: The name of the MySQL database.
- `MYSQL_HOST`: The host of the MySQL database.
- `MYSQL_PASSWORD`: The password for the MySQL database.
- `MYSQL_PORT`: The port of the MySQL database.
- `MYSQL_USER`: The username for the MySQL database.


### Usage

This utility provides two main actions: `dump` and `restore`.

#### Dumping the Database

To dump the database, run the following command:

```bash
npm run db dump <environment> <optional-dump-file-name>
```

*environment* should be either *local* or *server*.
*optional-restore-file-name* is the name of the dump file you want to restore from. If not provided, it defaults to backup.sql.

### Example usage

Dumping local database
````bash
npm run db dump local mydatabase_backup.sql
````


Restore local database
````bash
npm run db restore local mydatabase_backup.sql
````

**Similar procedure can be done for *server*, you can thus use this to do migration
