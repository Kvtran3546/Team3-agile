const dbConnection = require('./config/mongoConnection');
const data = require('./data');
const users = data.users;

async function main() {
    const db = await dbConnection.dbConnection();
    await db.dropDatabase();

    try {
        // Create user accounts
        await users.createUser('alice@gmail.com', 'Alice', 'Alicepassword!123');
        await users.createUser('bob@gmail.com', 'Bob123', 'Bobpassword!123');
        await users.createUser('tommy@gmail.com', 'Tommy202', 'Tompassword!123');
        await users.createUser('Jadek123@gmail.com', 'JadekXoXo123', 'Jadepassword!123');
        // Add more users as needed
    } catch (e) {
        console.error('Error creating seed data:', e);
    }
    console.log('Finished seeding database with initial data');
    return 0;
}

main().catch(console.error);
