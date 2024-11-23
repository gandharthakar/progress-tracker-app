import { labelType } from "@/types/playGroundTypes";

/* Encode string to slug */
export const convertToSlug = (str: string): string => {

    //replace all special characters | symbols with a space
    //eslint-disable-next-line
    str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
        .toLowerCase();

    // trim spaces at start and end of string
    str = str.replace(/^\s+|\s+$/gm, '');

    // replace space with dash/hyphen
    str = str.replace(/\s+/g, '-');
    return str;
};

// a little function to help us with reordering the result
export const reorder = (list: labelType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};