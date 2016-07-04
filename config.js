
var config = {
    'port': process.env.port || 8000,
    'database':'mongodb://127.0.0.1:27017/UdhaarManager',                                                  // database connection link
    'superSecretCustomer':'appIdeasSecret',                                                        // key for generating for customer api token
    'superSecretAdmin':'adminSecret' ,                                                              // key for generating admin api token
    'fareyeApiKey':'WQLQmwk2KzUn7aWTxz7E2Z1MIOEFdDHC',
    'biddingTime':7200000,
    'GoogleApiKey':'AIzaSyDrXPGpHU8bdvIX2FSM2eIedsHk7aNvLw4',
    'transactionKey':'transactionKey',
    'vendorKey':'vendorKey',
    'defaultUserPassword':'XYZSAMPLEPASSWORD'

};

module.exports = config;
