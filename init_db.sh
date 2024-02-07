#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
	CREATE USER docker;
	CREATE DATABASE budget_data;
	\c budget_data;
	CREATE TABLE daily_expenses (
          date date,
          type varchar(30),
          amount numeric,
	  description varchar(1000)
        );
	GRANT ALL PRIVILEGES ON DATABASE budget_data TO docker;
EOSQL
