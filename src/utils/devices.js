function processEnergy(energyData, deviceId, energy) {
    if (energyData.has(deviceId)) {
        energyData.set(deviceId, energyData.get(deviceId) + energy);
    } else {
        energyData.set(deviceId, energy);
    }
}

async function writeToDatabase() {
    console.log("Writing to database...");
    for (const [deviceId, energySum] of energyData.entries()) {
        console.log(`Device: ${deviceId}, Energy: ${energySum}`);
        // Replace this with actual database write logic
    }
    energyData.clear(); // Clear the in-memory data after writing to the database
}

function startInfiniteLoop(writeToDatabase) {
    (async function infiniteLoop() {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000)); // Wait for 5 minutes
            await writeToDatabase();
        }
    })();
}