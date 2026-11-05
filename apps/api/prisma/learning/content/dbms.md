# DBMS & SQL

Topics:

- ER model
- Relational model and keys
- Relational algebra
- Normalization: 1NF to BCNF
- SQL queries: joins, GROUP BY, subqueries
- Transactions and ACID
- Concurrency control
- Indexing

## Diagnostic misses (2 Oct)

### WHERE vs HAVING

- **Core idea:** WHERE filters rows **before** grouping and cannot use aggregate functions. HAVING filters groups **after** GROUP BY and can use COUNT, SUM, AVG.
- **Exam points:** logical execution order is FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.
- **Example:** `SELECT dept, COUNT(*) FROM emp WHERE salary > 30000 GROUP BY dept HAVING COUNT(*) > 5;`
- **Common mistake:** writing `WHERE COUNT(*) > 5`, which is an error.
