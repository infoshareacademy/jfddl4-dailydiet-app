export const mapObjectToArray = (obj) => (
    Object.entries(obj || {})
        .map(([key, value]) => (
            typeof value === 'object' ?
                { ...value, key }
                :
                { key, value }
        ))
)


export const upper = word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
