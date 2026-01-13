
drop table if exists Dancers;
drop table if exists Dances;

PRAGMA foreign_keys = ON;

CREATE TABLE Dances (
	danceID NUMBER PRIMARY KEY,
	choreographerID NUMBER,
	choreographerName TEXT,
	choreographerEmail TEXT,
	styleDifficulty TEXT,
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
	grizzlies BOOLEAN,
	committee TEXT,
	danceLevel TEXT,
	experience TEXT,
	-- photo BLOB,
	isChoreographer BOOLEAN,
	dancePreferences ARRAY
);
