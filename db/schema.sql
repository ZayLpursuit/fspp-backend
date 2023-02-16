DROP DATABASE IF EXISTS calorie_tracker;
CREATE DATABASE calorie_tracker;

\c calorie_tracker;

DROP TABLE IF EXISTS calories;

CREATE TABLE calories
-- 
( id SERIAL PRIMARY KEY,
name TEXT,
fiber INTEGER,
protein INTEGER,
sugar INTEGER,
carbs INTEGER,
fat INTEGER,
calories INTEGER,
dte DATE NOT NULL DEFAULT CURRENT_DATE);
