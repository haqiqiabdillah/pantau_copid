export const setUser = (value, inputType) => {
    return { type: 'USER', inputType: inputType, inputValue: value }
}

export const logout = () => {
    console.log('masuk')
    return { type: 'LOGOUT' }
}