export const createUser = (userData) =>{
    if(!userData || !userData.name){
        throw new Error("O nome do usuario é obrigatorio")
    }if(userData.age < 18){
        throw new Error("O usuário deve ser maior de idade")
    }

    const newUser = {
        id: Math.floor(Math.random(1, 18)),
        name: userData.name,
        age: userData.age,
        isActive: true, 
        roles: ['user'] 
    }
    return newUser
}

