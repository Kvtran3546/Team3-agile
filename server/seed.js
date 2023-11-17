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
        
        await users.createUser('echo@gmail.com', 'Echo11', 'Echopassword!123');
        await users.createUser('basil@gmail.com', 'Basilheart', 'Basilpassword!123');
        await users.createUser('lucas@gmail.com', 'LucasA', 'Lucaspassword!123');
        await users.createUser('raye@gmail.com', 'RayeGun', 'Rayepassword!123');

        await users.createUser('nikos@gmail.com', 'Nikos', 'Nikospassword!123');
        await users.createUser('shudong@gmail.com', 'Shudong', 'Shudongpassword!123');
        await users.createUser('meunier@gmail.com', 'Meunier', 'Meunierpassword!123');
        await users.createUser('sandeep@gmail.com', 'Sandeep', 'Sandeeppassword!123');
        // Add more users as needed
    } catch (e) {
        console.error('Error creating seed data:', e);
    }
    console.log('Finished seeding database with initial data');
    return 0;
}

main().catch(console.error);
