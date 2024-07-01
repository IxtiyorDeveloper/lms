export const getUniqueKeys = ({current, added}: { current: any[], added: any[] }) => {
    let mergedArray = current.concat(added);

    let uniqueArray = new Set(mergedArray);

    return Array.from(uniqueArray)
}
