import {lessonTimeTypes} from "constants/selects";

export function separateByType({arr}: { arr: any }) {
    if (arr) {
        // Initialize an empty object to temporarily hold the separated items
        const tempSeparated: any = {};

        // Iterate over each object in the array
        arr.forEach((item: { type: string | number; }) => {
            // Check if the type already exists in the tempSeparated object
            if (!tempSeparated[item.type]) {
                // If it doesn't exist, create a new array for this type
                tempSeparated[item.type] = [];
            }
            // Add the current item to the corresponding type array
            tempSeparated[item.type].push(item);
        });

        // Convert the object to an array of objects with type and data properties
        return Object.keys(tempSeparated).map(type => ({
            type: parseInt(type),  // Ensure the type is an integer
            label:lessonTimeTypes[parseInt(type) as keyof typeof lessonTimeTypes],
            data: tempSeparated[type]
        }));
    }
    return undefined
}
