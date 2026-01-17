
drop table if exists Dancers;
drop table if exists Dances;
drop table if exists danceParticipants;

PRAGMA foreign_keys = ON;
-- Booleans are numbers 0=false, 1=true

CREATE TABLE Dances (
	danceID NUMBER PRIMARY KEY,
	choreographerName TEXT,
	choreographerEmail TEXT,
	numDancers NUMBER,
	participants ARRAY
);

CREATE TABLE Dancers (
	studentID NUMBER,
	name TEXT,
	pronouns TEXT,
	auditionNumber NUMBER,
	phone TEXT,
	email TEXT PRIMARY KEY,
	classYear TEXT,
	numDances NUMBER,
	pocDance BOOLEAN,
	danceLevel TEXT,
	experience TEXT,
	-- photo BLOB,
	isChoreographer BOOLEAN,
	dancePreferences ARRAY
);

CREATE TABLE danceParticipants (
	danceID NUMBER,
	dancerEmail TEXT,
	FOREIGN KEY (danceID) REFERENCES Dances(danceID),
	FOREIGN KEY (dancerEmail) REFERENCES Dancers(email)
)