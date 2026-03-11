// Delete test user by phone number
const mongoose = require('mongoose');
require('dotenv').config();

const Vendor = require('./models/Vendor');

const deleteTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const phone = '9182129577'; // Your test phone number

    const result = await Vendor.deleteOne({ phone });

    if (result.deletedCount > 0) {
      console.log(`✅ Deleted vendor with phone: ${phone}`);
    } else {
      console.log(`❌ No vendor found with phone: ${phone}`);
    }

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

deleteTestUser();
