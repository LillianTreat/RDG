const Dancers = [
    {
        studentID: 592648,
        name: "Lillian Stafford",
        pronouns: "she/her",
        auditionNumber: 206,
        phone: 5415132745,
        email: "ltstafford@pugetsound.edu",
        classYear: "Sophomore",
        numDances: 3,
        pocDance: false,
        grizzlies: true,
        committee: "No Committee",
        danceLevel: "foo",
        experience: "bar",
        isChoreographer: true
    },

    {
        studentID: 123456,
        name: "Peachan Gill",
        pronouns: "she/her",
        auditionNumber: 101,
        phone: 5031234567,
        email: "pgill@pugetsound.edu",
        classYear: "Sophomore",
        numDances: 2,
        pocDance: true,
        grizzlies: false,
        committee: "No Committee",
        danceLevel: "meow",
        experience: "meow",
        isChoreographer: false
    },

    {
        studentID: 222222,
        name: "Choreographer 2",
        pronouns: "she/her",
        auditionNumber: 22,
        phone: 5415132745,
        email: "choreographer2@pugetsound.edu",
        classYear: "Sophomore",
        numDances: 3,
        pocDance: false,
        grizzlies: true,
        committee: "No Committee",
        danceLevel: "foo",
        experience: "bar",
        isChoreographer: true
    },

    {
        studentID: 333333,
        name: "Choreographer 3",
        pronouns: "she/her",
        auditionNumber: 33,
        phone: 5415132745,
        email: "choreographer3@pugetsound.edu",
        classYear: "Sophomore",
        numDances: 2,
        pocDance: false,
        grizzlies: true,
        committee: "No Committee",
        danceLevel: "foo",
        experience: "bar",
        isChoreographer: true
    },

    {
        studentID: 987654,
        name: "Dancer 2",
        pronouns: "she/her",
        auditionNumber: 65,
        phone: 5415132745,
        email: "dancer2@pugetsound.edu",
        classYear: "Sophomore",
        numDances: 2,
        pocDance: false,
        grizzlies: true,
        committee: "No Committee",
        danceLevel: "foo",
        experience: "bar",
        isChoreographer: false
    },

    {
        studentID: 765432,
        name: "Dancer 3",
        pronouns: "he/him",
        auditionNumber: 85,
        phone: 5415132745,
        email: "dancer3@pugetsound.edu",
        classYear: "Senior",
        numDances: 1,
        pocDance: false,
        grizzlies: true,
        committee: "No Committee",
        danceLevel: "foo",
        experience: "bar",
        isChoreographer: false
    },

]

const Dances = [
    {
        danceID: 1,
        choreographerID: 592648,
        choreographerName: "Lillian Stafford",
        choreographerEmail: "ltstafford@pugetsound.edu",
        styleDifficulty: "Intermediate/Advanced Jazz"
    },
    {
        danceID: 2,
        choreographerID: 222222,
        choreographerName: "Choreographer Two",
        choreographerEmail: "choreographer2@pugetsound.edu",
        styleDifficulty: "Advanced"
    },
    {
        danceID: 3,
        choreographerID: 333333,
        choreographerName: "Choreographer Three",
        choreographerEmail: "choreographer3@pugetsound.edu",
        styleDifficulty: "Beginner"
    },
    {
        danceID: 4,
        choreographerID: 444444,
        choreographerName: "Choreographer Four",
        choreographerEmail: "choreographer4@pugetsound.edu",
        styleDifficulty: "Intermediate"
    },
    {
        danceID: 5,
        choreographerID: 555555,
        choreographerName: "Choreographer Five",
        choreographerEmail: "choreographer5@pugetsound.edu",
        styleDifficulty: "Intermediate/Advanced"
    },
    {
        danceID: 6,
        choreographerID: 666666,
        choreographerName: "Choreographer Six",
        choreographerEmail: "choreographer6@pugetsound.edu",
        styleDifficulty: "Beginner/Intermediate"
    },
    {
        danceID: 7,
        choreographerID: 777777,
        choreographerName: "Choreographer Seven",
        choreographerEmail: "choreographer7@pugetsound.edu",
        styleDifficulty: "Beginner"
    },
]



/*-----------------Data Loading------------------*/

/**
 * Loads all test data
 * @param {Database} db 
 */
function loadTestData(db) {
    try {
        addDancers(db);
        addDances(db);
        addDancerInfo(db);
    } catch (error) {
        console.log(`data/loadTestData: ${error}`);
    }
}

function addDancers(db) {
    for (let dancer of Dancers) {
        db.addDancer(dancer.email, dancer.studentID);
    }
}

function addDances(db) {
    for (let dance of Dances) {
        db.addDance(dance.choreographerID, dance.choreographerEmail, dance.choreographerName, dance.styleDifficulty);
    }
}

function addDancerInfo(db) {
    for (let dancer of Dancers) {
        db.addDancerInfo(dancer.name, dancer.pronouns, dancer.auditionNumber, dancer.phone, dancer.email, dancer.classYear, dancer.numDances, dancer.pocDance, dancer.grizzlies, dancer.committee, dancer.danceLevel, dancer.experience, dancer.isChoreographer);
    }
}


module.exports = { loadTestData };

