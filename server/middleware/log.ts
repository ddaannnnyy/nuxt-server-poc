export default defineEventHandler((event) => {
    console.log('request made: ', getRequestURL(event), '\r\n');
})