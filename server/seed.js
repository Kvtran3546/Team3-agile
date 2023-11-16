const dbConnection = require('./config/mongoConnection');
const data = require('./data');
const users = data.users;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    try {
        // Create user accounts
        await users.createUser('alice@example.com', 'Alice', 'alicepassword');
        await users.createUser('bob@example.com', 'Bob', 'bobpassword');
        // Add more users as needed
    } catch (e) {
        console.error('Error creating seed data:', e);
    }

    console.log('Finished seeding database with initial data');
    await db.serverConfig.close();
}

main().catch(console.error);
