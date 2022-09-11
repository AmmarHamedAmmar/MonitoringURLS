# Getting a single row

**const result = await db.get('SELECT col FROM tbl WHERE col = ?', 'test')**


# Getting many rows
**const result = await db.all('SELECT col FROM tbl')**

# Don't forget it again and note that get in beeKeeper get single rows and many rows .....