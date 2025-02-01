export function generateRandomRoomId(length = 10){
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let roomId = '';

    for(let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * characters.length);
        roomId += characters[randomIndex]
    }

    return roomId;
}