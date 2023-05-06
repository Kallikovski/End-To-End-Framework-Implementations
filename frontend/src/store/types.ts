export type User = {
    surname: string,
    lastname: string,
    age: number,
    occupation: string,
    email: string,
}

export type UpdateForm = {
    surname?: string,
    lastname?: string,
    occupation?: string,
    age?: number,
    email?: string
}
