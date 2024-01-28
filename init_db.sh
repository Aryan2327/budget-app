#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
	CREATE USER docker;
	CREATE DATABASE budget_data;
	\c budget_data;
	CREATE TABLE daily_expenses (month varchar(20), year integer);
	GRANT ALL PRIVILEGES ON DATABASE budget_data TO docker;
EOSQL
