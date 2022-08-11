databasename="globalstore"

createdb ${databasename}

psql -d ${databasename} -f initRelations.sql
psql -d ${databasename} -f initConstraints.sql
psql -d ${databasename} -f initFunctions.sql
psql -d ${databasename} -f initTriggers.sql
