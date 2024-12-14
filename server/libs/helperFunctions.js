const isGmail = (email) => {
    return email.endsWith('@gmail.com');
}

const isValidGmail = (email) => {
    const gmailRegex = /^[^\s@]+@[^\s@]+\.gmail\.com$/;
    return gmailRegex.test(email);
}

const generateOTP = (digits) => {
    let otp = "";
    const characters = "0123456789";

    for (let i = 0; i < digits; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otp += characters.charAt(randomIndex);
    }

    return otp;
}

const isValidObjectIdString = (id) => /^[a-fA-F0-9]{24}$/.test(String(id));

const sortLabelsBySequence = (labels, labelOrder) => {
    // Create a map of label IDs to their indices in the label Order array
    const orderMap = new Map(labelOrder.map((labelId, index) => [labelId, index]));

    // Sort the labels based on their index in the orderMap, or append them to the end.
    const sortedTags = labels.sort((a, b) => {
        const aIndex = orderMap.get(a.label_id.toString()) ?? Infinity;
        const bIndex = orderMap.get(b.label_id.toString()) ?? Infinity;
        return aIndex - bIndex;
    });

    return sortedTags;
}

const sortSectionsBySequence = (sections, sectionOrder) => {
    // Create a map of sections IDs to their indices in the sections Orders array
    const orderMap = new Map(sectionOrder.map((sectionId, index) => [sectionId, index]));

    // Sort the sections based on their index in the orderMap, or append them to the end.
    const sortedTags = sections.sort((a, b) => {
        const aIndex = orderMap.get(a.section_id.toString()) ?? Infinity;
        const bIndex = orderMap.get(b.section_id.toString()) ?? Infinity;
        return aIndex - bIndex;
    });

    return sortedTags;
}

const insertValueAtIndex = (array, index, newValue) => {
    // const ind = Number(index);
    if (index < 0 || index > array.length) {
        throw new Error("Wrong index number provided or index out of bounds.");
    }

    // Create a new array to avoid mutating the original array
    const updatedArray = [...array];

    // Insert the new value at the specified index
    updatedArray.splice(index, 0, newValue);

    return updatedArray;
}

module.exports = {
    isGmail,
    generateOTP,
    isValidObjectIdString,
    sortLabelsBySequence,
    sortSectionsBySequence,
    insertValueAtIndex
}