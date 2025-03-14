# Database structure
This is how database for this project is configured. 

The database has 7 tables:
- application
- availability
- competence
- competence_profile
- person
- role
- application_status

## Table - application table
Stores applications, applicants connected to them and applications' statuses.
Columns:
- **application_id** (Integer): PK, identification number for an application
- **person_id** (Integer): FK, person, to whom the applciation is connected
- **application_status_id** (Integer): FK, application_status, used to map different statuses
Rows:
Each row represents a job application

## Table - application_status table
Stores applications, applicants connected to them and applications' statuses.
Columns:
- **application_status_id** (Integer): PK, identification number for an application status
- **name** (Character 255): name of the status message, currently "PENDING", "ACCEPTED and "REJECTED" mapped to 1,2 and 3 respectively
Rows:
Each row represents a status message and its associated id.

## Table - availability
Stores available dates for each person
Columns:
- **availability_id** (Integer): PK, identification number for an availability slot 
- **person_id** (Integer): FK, person, to whom availability slot is connected
- **from_date** (Date): Date from which the person is available
- **to_date** (Date): Date until which the person is available
Rows:
Each row is an availability slot for a specific person

## Table - competence
Maps competence areas IDs to their respective names
Columns:
- **competence_id** (Integer): PK, identification number for a competence area
- **name** (Character 255): Name of a competence area
Rows:
- 1: ticket sales
- 2: lotteries
- 3: roller coaster operation

## Table - competence_profile
Stores competence profiles for each person
Columns:
- **competence_profile_id** (Integer): PK, identification number for a competence profile
- **person_id** (Integer): FK, person, to whom competence profile is connected
- **competence_id** (Integer): FK, competence area idetifiier, see Table - competence, above
- **years_of_experience** (Numeric): years of experience in a specific competence area
Rows:
Each row is a competence profile for a specific competence area for a specific person

## Table - person
Stores information about a person and their account
Columns:
- **person_id** (Integer): PK, identification number for a person
- **name** (Character 255): person's first name
- **surname** (Character 255): person's last name
- **pnr** (Character 255): person's personal number
- **email** (Character 255): person's email
- **password** (Integer): password to person's account
- **role_id** (Integer): FK, person's role identifier, see Table - role, below
- **username** (Integer): username to person's account
Rows:
Each row is a person

## Table - role
Maps role identifier to its name
Columns:
- **role_id** (Integer):  PK, identification number for a role
- **name** (Character 255): name of a role
Rows:
- 1: recruiter
- 2: applicant

