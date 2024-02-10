import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'postgres-db',
    port: 5432,
    database: 'budget_data',
});

export const query = async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    console.log(res)
    return res;
}

export const getClient = async () => {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;


    // Set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than five seconds!')
        console.error('The last expected query on this client was: ${client.lastQuery}')
    }, 5000);

    // Monkeypatch the query method to keep track of the last query executed
    client.query = (...args) => {
        client.lastQuery = args
        return query.apply(client, args)
    }

    client.release = () => {
        clearTimeout(timeout)

        // "Un-monkeypatch" the methods
        client.query = query
        client.release = release
        return release.apply(client)
    }
    return client
}
