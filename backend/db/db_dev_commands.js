import { exec } from 'child_process';
import dotenv from 'dotenv';

const getConfigPath = (env) => {
    if (env === 'local') {
        return '.env.local';
    } else if (env === 'server') {
        return '.env.server';
    } else {
        console.error('Invalid environment. Please provide "local" or "server".');
        process.exit(1);
    }
};

const dumpOrRestore = (action, env, fileName) => {
    dotenv.config({ path: getConfigPath(env) });

    const dumpFileName = fileName || 'backup.sql';

    const dumpSQLCommand = `mysqldump -h ${process.env.MYSQL_HOST} -u ${process.env.MYSQL_USER} -p ${process.env.MYSQL_DATABASE} > ${dumpFileName}`;
    const restoreSQLCommand = `mysql -h ${process.env.MYSQL_HOST} -u ${process.env.MYSQL_USER} -p ${process.env.MYSQL_DATABASE} < ${dumpFileName}`;

    if (action === 'dump') {
        exec(dumpSQLCommand, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Database dumped successfully.`);
        });
    } else if (action === 'restore') {
        exec(restoreSQLCommand, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Database restored successfully.`);
        });
    } else {
        console.error('Invalid action. Please provide "dump" or "restore" as a command line argument.');
    }
};

const action = process.argv[2];
const env = process.argv[3];
const fileName = process.argv[4];

if (action && env) {
    dumpOrRestore(action, env, fileName);
} else {
    console.error('Invalid usage. Please provide "dump" or "restore" as action and "local" or "server" as environment.');
}
