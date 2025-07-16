const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/crm', {
    useUnifiedTopology: true
})
.then(() => console.log('Mongodb Connected'))
.catch
(err => {
    console.log('Mongodb Connection Error', err)
    process.exit(1);
});