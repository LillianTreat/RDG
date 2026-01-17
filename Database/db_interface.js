const fs = require("node:fs");
const sqlite3 = require("better-sqlite3");

class Database {
    // Database object
    #db;

    /**
     * Opens/creates a database.
     * @constructor
     * @param {String} filename The database file to open.
     * @param {String} schemaFile If not null, applies the given schema to the database.
     */
    constructor(filename, schemaFile = null) {
        this.#db = new sqlite3(filename);

        // Load schema
        if (schemaFile !== null) {
            try {
                const data = fs.readFileSync(schemaFile, 'utf-8');
                try {
                    this.#db.exec(data);
                } catch (err) {
                    console.error("Error loading db schema:", err);
                    return;
                }
            } catch (err) {
                console.error("Error reading file:", err);
                return;
            }
        }
    }

    /**
     * Closes the database connection.
     */
    close() {
        this.#db.close((err) => {
            if (err) {
                console.error("Database couldn't be closed:", err);
            }
        });
    }

    /******************************************************************
     * 
     *                      ADDING methods
     * 
     ******************************************************************/


 /**
     * Adds a dancer.
     * @param {String} email The user's email address
     * @param {String} studentID The user's studentID
     * @throws Throws an exception if an account with the provided email already exists.     
     */
    addDancer(email, studentID) {
        this.#verifyNotExists("Dancers", "email", email);

        // Ensure email is valid
        if (email === "") {
            throw new Error("addDancer: email must not be an empty string.");
        }

        // Ensure studentID is valid
        if (studentID === "") {
            throw new Error("addDancer: studentID must not be an empty string.");
        }

        // Insert NULL for all other fields
        const query = `INSERT INTO Dancers (email, studentID, name, pronouns, auditionNumber, phone, classYear, numDances, pocDance, grizzlies, committee, danceLevel, experience, isChoreographer) 
                       VALUES (?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`;
        this.#db.prepare(query).run(
            email,
            studentID
        );
    }

    addDancerInfo(name, pronouns, auditionNumber, phone, email, classYear, numDances, pocDance, danceLevel, experience, dancePreferences) {
        if (!this.dancerExists(email)) {
            throw new Error("addDancerInfo: dancer does not exist.");
        }

        const query = "UPDATE Dancers SET name = ?, pronouns = ?, auditionNumber = ?, phone = ?, classYear = ?, numDances = ?, pocDance = ?, danceLevel = ?, experience = ?, isChoreographer = NULL, dancePreferences = NULL WHERE email = ?";
        this.#db.prepare(query).run(
            name,
            pronouns,
            auditionNumber,
            phone,
            email,
            classYear,
            numDances,
            pocDance,
            danceLevel,
            experience,
            dancePreferences,
        );
    }

    addDancePreferences(email, dancePreferences){
        if (!this.dancerExists(email)) {
            throw new Error("addDancePreferences: dancer does not exist.");
        }

        const query = "UPDATE Dancers SET dancePreferences = ? WHERE email = ?";
        this.#db.prepare(query).run(
            JSON.stringify(dancePreferences),
            email
        );
    }
    

    addDance(choreographerEmail, choreographerName) {
        if (choreographerEmail === "") {
            throw new Error("addDance: choreographerEmail must not be an empty string.");
        }
        if (choreographerName === "") {
            throw new Error("addDance: choreographerName must not be an empty string.");
        }

        if (!this.dancerExists(choreographerEmail)){
            this.addDancer(choreographerEmail);
        };

        let danceID = this.#db.prepare("SELECT MAX(danceID) FROM Dances").get()["MAX(danceID)"] + 1;

        const query = "INSERT INTO Dances (choreographerEmail, choreographerName, danceID) VALUES (?, ?, ?)";
        this.#db.prepare(query).run(
            choreographerEmail,
            choreographerName,
            danceID
        );

        const query2 = "UPDATE Dancers SET isChoreographer = ? WHERE email = ?";
        this.#db.prepare(query2).run(1, choreographerEmail);
    }


    addToDance(email, danceID) {
        this.#verifyExists("Dancers", "email", email);
        this.#verifyExists("Dances", "danceID", danceID);

        const query = "INSERT INTO danceParticipants (dancerEmail, danceID) VALUES (?, ?)";
        this.#db.prepare(query).run(email, danceID);
    }


    removeFromDance(email, danceID) {
        this.#verifyExists("Dancers", "email", email);
        this.#verifyExists("Dances", "danceID", danceID);

        const query = "DELETE FROM danceParticipants WHERE dancerEmail = ? AND danceID = ?";
        this.#db.prepare(query).run(email, danceID);
    }

    removeDance(danceID) {
        this.#verifyExists("Dances", "danceID", danceID);

        const query = "DELETE FROM Dances WHERE danceID = ?";
        this.#db.prepare(query).run(danceID);
    }

    /******************************************************************
     * 
     *                      CHECKING methods
     * 
     ******************************************************************/

    getAllDances() {
        this.#verifyExists('Dances');
        const query = "SELECT * FROM Dances";
        return this.#db.prepare(query).all()
    }

    userIsChoreographer(email) {
        this.#verifyExists("Dancers", "email", email);
        const query = "SELECT isChoreographer FROM Dancers WHERE email = ?";
        return this.#db.prepare(query).get(email)["isChoreographer"] === 1;
    }
    
    dancerExists(email) {
        const query = "SELECT EXISTS(SELECT 1 FROM Dancers WHERE email = ?) AS valueExists";
        return this.#db.prepare(query).get(email)["valueExists"] === 1;
    }

    /******************************************************************
    * 
    *                   PRIVATE METHODS
    * 
    ******************************************************************/

    // Verifies that an entry in the database exists, throwing an error if it doesn't.
    #verifyExists(table) {
        // Generate where clause
        let where = "";
        if (arguments.length > 1) {
            where += "WHERE "
            for (let i = 1; i < arguments.length; i += 2) {
                if (i > 1) {
                    where += " AND ";
                }
                where += `${arguments[i]} = ?`;
            }
        }

        // Generate values
        let values = []
        for (let i = 2; i < arguments.length; i += 2) {
            values.push(arguments[i]);
        }

        // Run query
        const query = `SELECT EXISTS(SELECT 1 FROM ${table} ${where}) AS valueExists`;
        if (this.#db.prepare(query).get(...values)["valueExists"] === 0) {
            // Handle attributes checked
            if (arguments.length > 1) {
                let attributes = "";
                for (let i = 1; i < arguments.length; i += 2) {
                    if (i > 1) {
                        attributes += ", ";
                    }
                    attributes += `${arguments[i]}: ${arguments[i + 1]} `;
                }
                throw new Error(`Row containing ${attributes} doesn't exist in table ${table}.`);
            }
        }
    }

    // Verifies that an entry in the database doesn't exist, throwing an error if it does.
    #verifyNotExists(table) {
        // Generate where clause
        let where = "";
        if (arguments.length > 1) {
            where += "WHERE "
            for (let i = 1; i < arguments.length; i += 2) {
                if (i > 1) {
                    where += " AND ";
                }
                where += `${arguments[i]} = ?`;
            }
        }

        // Generate values
        let values = []
        for (let i = 2; i < arguments.length; i += 2) {
            values.push(arguments[i]);
        }

        // Run query
        const query = `SELECT EXISTS (SELECT 1 FROM ${table} ${where}) AS valueExists`;
        if (this.#db.prepare(query).get(...values)["valueExists"] === 1) {
            // Handle attributes checked
            if (arguments.length > 1) {
                let attributes = "";
                for (let i = 1; i < arguments.length; i += 2) {
                    if (i > 1) {
                        attributes += ", ";
                    }
                    attributes += `${arguments[i]}: ${arguments[i + 1]}`;
                }
                throw new Error(`Row containing ${attributes} already exists in table ${table}.`);
            }
        }
    }
}

module.exports = { Database };