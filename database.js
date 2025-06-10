import { Pool } from "pg";
export default async  function connect() {

    if(global.connection)
        return global.connection.connect();
    
    
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'estudos',
        password: 'root',
        port: 5432,
    });
    
    const client = await pool.connect();
    console.log("Criou o pool de conexao")

    const res = await client.query("select now()")
    console.log(res.rows[0]);
    client.release();
    

    global.connection = pool;
    return pool.connect();

    
}
connect();


async function selectUsers() {
    const client = await connect()
    const sql = "SELECT * FROM usuarios"
    const res = await client.query(sql);
    return res.rows;
}

async function selectUser(id) {
    const client = await connect();
    const sql = "SELECT * FROM usuarios WHERE ID=$1"
    const values = [id]
    const res = await client.query(sql, values);
    return res.rows;
}

async function insertUser(user) {
    const client = await connect();
    const sql = "INSERT INTO usuarios(nome,idade,uf) VALUES ($1,$2,$3)";
    const values = [user.nome, user.idade, user.uf]
    await client.query(sql, values);
}



export { selectUsers, selectUser, insertUser };