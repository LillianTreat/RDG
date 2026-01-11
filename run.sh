rm -f *.db
node config.js -test true -db test.db
node index.js