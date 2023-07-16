FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongo --db main --collection languages --type json --file /init.json --jsonArray