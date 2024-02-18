#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
	CREATE DATABASE budget_data;
	\c budget_data;
	CREATE TABLE daily_expenses (
          date date,
          type varchar(30),
          amount numeric,
	  description varchar(1000)
        );
EOSQL
