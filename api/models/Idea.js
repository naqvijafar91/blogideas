/**
 * Idea.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required:true
    },
    header: {
      type: 'string'
    },
    text: {
      type: 'string',
      required:true
    },

    approved:{
      type:'boolean',
      defaultsTo:false,
      required:true
    },

    // Add a reference to User
    owner: {
      model: 'user',
      required:true
    },

    likers:{
      collection:'user',
      via:'likes'
    }
  }
};

