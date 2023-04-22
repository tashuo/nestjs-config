console.log(process.env.APP_NAME)
export default {
    name: process.env.APP_NAME || 'app',
};
  