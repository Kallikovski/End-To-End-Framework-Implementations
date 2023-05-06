import mongoose, { ConnectOptions } from "mongoose";

export class Database {

    private static database: Database;

    private constructor(_databaseURI: string, _timeOut: number) {
        mongoose.connect(_databaseURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
            .then(() => {
                console.log(`Database connected to ${_databaseURI}.`)
                // mongoose.connection.dropDatabase((error) =>{
                //     console.log(error)
                // });
                mongoose.connection.on("disconnected", () => {
                    setTimeout(() => {
                        mongoose.connect(_databaseURI, {
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                        } as ConnectOptions)
                            .then(() => console.log(`Database reconnected to ${_databaseURI}!`))
                            .catch(() => console.log(`Database reconnection to ${_databaseURI} failed!`))
                    }, _timeOut);
                });
            })
            .catch((error) => { 
                console.log(`Database connection to ${_databaseURI} failed!`) 
                console.error(error) 
            })
    }
    
    public static connectDatabase(_databaseURI: string = 'empty', _timeOut: number = 3000): Database {
        if (!Database.database) {
            Database.database = new Database(_databaseURI, _timeOut);
        }
        else{
            console.log(`Database connection already established on ${_databaseURI}!`)
        }
        return Database.database;
    }
}

