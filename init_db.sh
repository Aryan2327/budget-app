#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
	CREATE USER root;
	CREATE DATABASE budget_data;
	\c budget_data;
	CREATE TABLE monthy_expenses (month varchar(20), year integer);
	GRANT ALL PRIVILEGES ON DATABASE budget_data TO root;
EOSQL
