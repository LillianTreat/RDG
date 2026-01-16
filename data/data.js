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
        pocDance: 0,
        grizzlies: 1,
        committee: "No Committee",
        danceLevel: "foo",
        experience: "bar",
        isChoreographer: 1
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
        pocDance: 1,
        grizzlies: 0,
        committee: "No Committee",
        danceLevel: "meow",
        experience: "meow",
        isChoreographer: 0
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
        pocDance: 0,
        grizzlies: 1,
        committee: "No Committee",
        danceLevel: "foo",
        experience: "bar",
        isChoreographer: 1
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
        pocDance: 0,
        grizzlies: 1,
        committee: "No Committee",
        danceLevel: "foo",
        experience: "bar",
        isChoreographer: 1
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
        pocDance: 0,
        grizzlies: 1,
        committee: "No Committee",
        danceLevel: "foo",
        experience: "bar",
        isChoreographer: 0
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
        pocDance: 0,
        grizzlies: 1,
        committee: "No Committee",
        danceLevel: "foo",
        experience: "bar",
        isChoreographer: 0
    },

]

const Dances = [
    {
        danceID: 1,
        choreographerName: "Lillian Stafford",
        choreographerEmail: "ltstafford@pugetsound.edu",
    },
    {
        danceID: 2,
        choreographerName: "Choreographer Two",
        choreographerEmail: "choreographer2@pugetsound.edu",
    },
    {
        danceID: 3,
        choreographerName: "Choreographer Three",
        choreographerEmail: "choreographer3@pugetsound.edu",
    },
    {
        danceID: 4,
        choreographerName: "Choreographer Four",
        choreographerEmail: "choreographer4@pugetsound.edu",
      
    },
    {
        danceID: 5,
        choreographerName: "Choreographer Five",
        choreographerEmail: "choreographer5@pugetsound.edu",

    },
    {
        danceID: 6,
        choreographerName: "Choreographer Six",
        choreographerEmail: "choreographer6@pugetsound.edu",
    },
    {
        danceID: 7,
        choreographerName: "Choreographer Seven",
        choreographerEmail: "choreographer7@pugetsound.edu",
    },
]



/*-----------------Data Loading------------------*/

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
        db.addDance(dance.choreographerEmail, dance.choreographerName, dance.danceID);
    }
}

function addDancerInfo(db) {
    for (let dancer of Dancers) {
        db.addDancerInfo(dancer.name, dancer.pronouns, dancer.auditionNumber, dancer.phone, dancer.email, dancer.classYear, dancer.numDances, dancer.pocDance, dancer.grizzlies, dancer.committee, dancer.danceLevel, dancer.experience, dancer.isChoreographer);
    }
}


module.exports = { loadTestData };

