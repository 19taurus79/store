//Робота з loacalStorage
export function saveToStorage(key, value) {
    // Получаем текущие данные из localStorage
    let existingData = getFromStorage(key) || [];
    
    // Проверяем, является ли existingData массивом
    if (!Array.isArray(existingData)) {
        existingData = [existingData]; // Преобразуем в массив, если это не массив
    }
    
    // Добавляем новое значение к текущим данным
    existingData.push(value);
    
    // Сохраняем обновлённый массив обратно в localStorage
    localStorage.setItem(key, JSON.stringify(existingData));
}

export function getFromStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};
export function removeFromStorage(key, value) {
    // Получаем текущие данные из localStorage
    let existingData = getFromStorage(key) || [];
    
    // Проверяем, является ли existingData массивом
    if (!Array.isArray(existingData)) {
        existingData = [existingData]; // Преобразуем в массив, если это не массив      
    }
    
    // Удаляем значение из массива
    existingData = existingData.filter(item => item !== value);
    
    // Сохраняем обновлённый массив обратно в localStorage
    localStorage.setItem(key, JSON.stringify(existingData));
    if (existingData.length === 0) {
        // Если массив пустой, удаляем ключ из localStorage
        // localStorage.removeItem(key);
    }
    
}