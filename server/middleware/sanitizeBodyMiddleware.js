const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const { ObjectId } = require('mongodb');

// Middleware to sanitize req.body
const sanitizeBodyMiddleware = (req, res, next) => {
    if (!req.body) {
        next();
        return;
    }

    // Handle array of objects
    if (Array.isArray(req.body)) {
        req.body = req.body.map(item => sanitizeObject(item));
    } 
    // Handle single object
    else if (typeof req.body === 'object') {
        req.body = sanitizeObject(req.body);
    }

    next();
};

const sanitizeObject = (obj) => {
    const sanitized = {};
    
    for (const [key, value] of Object.entries(obj)) {
        // Handle arrays (like task_sequence)
        if (Array.isArray(value)) {
            sanitized[key] = value.map(item => {
                if (typeof item === 'string' && ObjectId.isValid(item)) {
                    return new ObjectId(item);
                }
                return item;
            });
        }
        // Handle single ObjectId strings
        else if (typeof value === 'string' && ObjectId.isValid(value)) {
            sanitized[key] = new ObjectId(value);
        }
        // Handle nested objects
        else if (typeof value === 'object' && value !== null) {
            sanitized[key] = sanitizeObject(value);
        }
        // Keep other values as is
        else {
            sanitized[key] = value;
        }
    }

    return sanitized;
};

module.exports = sanitizeBodyMiddleware;