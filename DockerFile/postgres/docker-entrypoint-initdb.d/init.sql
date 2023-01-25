CREATE EXTENSION postgis;

CREATE TABLE IF NOT EXISTS contacts(
contact_id SERIAL PRIMARY KEY,
contact_name varchar(255) NOT NULL,
contact_middle_name varchar(255) NULL,
contact_surname varchar(255) NOT NULL,
contact_email varchar(255) NULL,
contact_phone varchar(15) NOT NULL,
contact_note TEXT NULL,
contact_address TEXT NULL,
contact_location point NULL,
contact_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
); 

CREATE TABLE IF NOT EXISTS contacts_history(
contact_id SERIAL PRIMARY KEY,
contact_old_id varchar(255) NULL,
contact_name varchar(255) NOT NULL,
contact_middle_name varchar(255) NULL,
contact_surname varchar(255) NOT NULL,
contact_email varchar(255) NULL,
contact_phone varchar(15) NOT NULL,
contact_action varchar(15) NOT NULL,
contact_note TEXT NULL,
contact_address TEXT NULL,
contact_location point NULL,
contact_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
); 

-- insert into Role(RoleName)
-- values ('Admin'),('User');