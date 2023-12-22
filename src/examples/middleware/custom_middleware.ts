export const customLogger = (message) => (req, res, next) => {
    console.log(`hello ${message} from custom middleware`);
    
    next()
}