const mongoose = require('mongoose');

//pointSchema connect with trackSchema
const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

//trackSchema
const trackSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  name: {
    type: String,
    default: '',
  },
  locations: [pointSchema],
});

// hasing password using bcrypt
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

const Track = mongoose.model('Track', trackSchema);
module.exports = Track;
