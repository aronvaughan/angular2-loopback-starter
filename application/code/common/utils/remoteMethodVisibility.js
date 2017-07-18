module.exports =  {

  makeReadOnly: function(ApiObject) {

    ApiObject.disableRemoteMethod('create', true);		// Removes (POST) /products
    ApiObject.disableRemoteMethod('upsert', true);		// Removes (PUT) /products
    ApiObject.disableRemoteMethod('deleteById', true);	// Removes (DELETE) /products/:id
    ApiObject.disableRemoteMethod("updateAll", true);		// Removes (POST) /products/update
    ApiObject.disableRemoteMethod("updateAttributes", false); // Removes (PUT) /products/:id
    ApiObject.disableRemoteMethod('createChangeStream', true); // removes (GET|POST) /products/change-stream
    ApiObject.disableRemoteMethod("update", true);

    ApiObject.disableRemoteMethod("replaceOrCreate", true);
    ApiObject.disableRemoteMethod("upsertWithWhere", true);

    /*
     ApiObject.disableRemoteMethod("find", true);
     ApiObject.disableRemoteMethod("findById", true);
     ApiObject.disableRemoteMethod("findOne", true);
     */

    ApiObject.disableRemoteMethod("deleteById", true);

    //ApiObject.disableRemoteMethod("count", true);
    //ApiObject.disableRemoteMethod("exists", true);
  }
}
