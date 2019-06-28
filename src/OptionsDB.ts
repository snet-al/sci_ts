

let  dbConfig: any = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "test7",
    synchronize: true,
    logging: false,
    entities: [
        "src/entity/**/*.ts"
        ],
    migrations: [
        "src/migration/**/*.ts"
        ],
    subscribers: [
        "src/subscriber/**/*.ts"
        ],
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
    }
};


export { dbConfig }
