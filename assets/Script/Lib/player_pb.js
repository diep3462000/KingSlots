/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var map_field_entry_pb = require('./map_field_entry_pb.js');
goog.exportSymbol('proto.BINPlayer', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.BINPlayer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.BINPlayer.repeatedFields_, null);
};
goog.inherits(proto.BINPlayer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.BINPlayer.displayName = 'proto.BINPlayer';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.BINPlayer.repeatedFields_ = [11];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.BINPlayer.prototype.toObject = function(opt_includeInstance) {
  return proto.BINPlayer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.BINPlayer} msg The msg instance to transform.
 * @return {!Object}
 */
proto.BINPlayer.toObject = function(includeInstance, msg) {
  var f, obj = {
    userid: jspb.Message.getField(msg, 1),
    username: jspb.Message.getField(msg, 2),
    displayname: jspb.Message.getField(msg, 3),
    avatarid: jspb.Message.getField(msg, 4),
    level: jspb.Message.getField(msg, 5),
    cash: jspb.Message.getField(msg, 6),
    gold: jspb.Message.getField(msg, 7),
    ready: jspb.Message.getField(msg, 8),
    exitaftermatchend: jspb.Message.getField(msg, 9),
    tableindex: jspb.Message.getField(msg, 10),
    argsList: jspb.Message.toObjectList(msg.getArgsList(),
    map_field_entry_pb.BINMapFieldEntry.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.BINPlayer}
 */
proto.BINPlayer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.BINPlayer;
  return proto.BINPlayer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.BINPlayer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.BINPlayer}
 */
proto.BINPlayer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUserid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsername(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDisplayname(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAvatarid(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLevel(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCash(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setGold(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReady(value);
      break;
    case 9:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setExitaftermatchend(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTableindex(value);
      break;
    case 11:
      var value = new map_field_entry_pb.BINMapFieldEntry;
      reader.readMessage(value,map_field_entry_pb.BINMapFieldEntry.deserializeBinaryFromReader);
      msg.addArgs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.BINPlayer} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.BINPlayer.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.BINPlayer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.BINPlayer.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(this, 1));
  if (f != null) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(this, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(this, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(this, 4));
  if (f != null) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(this, 5));
  if (f != null) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(this, 6));
  if (f != null) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(this, 7));
  if (f != null) {
    writer.writeInt64(
      7,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(this, 8));
  if (f != null) {
    writer.writeBool(
      8,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(this, 9));
  if (f != null) {
    writer.writeBool(
      9,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(this, 10));
  if (f != null) {
    writer.writeInt32(
      10,
      f
    );
  }
  f = this.getArgsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      11,
      f,
      map_field_entry_pb.BINMapFieldEntry.serializeBinaryToWriter
    );
  }
};


/**
 * required int64 userId = 1;
 * @return {number}
 */
proto.BINPlayer.prototype.getUserid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.BINPlayer.prototype.setUserid = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.BINPlayer.prototype.clearUserid = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.BINPlayer.prototype.hasUserid = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string userName = 2;
 * @return {string}
 */
proto.BINPlayer.prototype.getUsername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.BINPlayer.prototype.setUsername = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.BINPlayer.prototype.clearUsername = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.BINPlayer.prototype.hasUsername = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string displayName = 3;
 * @return {string}
 */
proto.BINPlayer.prototype.getDisplayname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.BINPlayer.prototype.setDisplayname = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.BINPlayer.prototype.clearDisplayname = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.BINPlayer.prototype.hasDisplayname = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional int32 avatarId = 4;
 * @return {number}
 */
proto.BINPlayer.prototype.getAvatarid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.BINPlayer.prototype.setAvatarid = function(value) {
  jspb.Message.setField(this, 4, value);
};


proto.BINPlayer.prototype.clearAvatarid = function() {
  jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.BINPlayer.prototype.hasAvatarid = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * required int32 level = 5;
 * @return {number}
 */
proto.BINPlayer.prototype.getLevel = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {number} value */
proto.BINPlayer.prototype.setLevel = function(value) {
  jspb.Message.setField(this, 5, value);
};


proto.BINPlayer.prototype.clearLevel = function() {
  jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.BINPlayer.prototype.hasLevel = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * required int64 cash = 6;
 * @return {number}
 */
proto.BINPlayer.prototype.getCash = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/** @param {number} value */
proto.BINPlayer.prototype.setCash = function(value) {
  jspb.Message.setField(this, 6, value);
};


proto.BINPlayer.prototype.clearCash = function() {
  jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.BINPlayer.prototype.hasCash = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * required int64 gold = 7;
 * @return {number}
 */
proto.BINPlayer.prototype.getGold = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/** @param {number} value */
proto.BINPlayer.prototype.setGold = function(value) {
  jspb.Message.setField(this, 7, value);
};


proto.BINPlayer.prototype.clearGold = function() {
  jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.BINPlayer.prototype.hasGold = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * required bool ready = 8;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.BINPlayer.prototype.getReady = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 8, false));
};


/** @param {boolean} value */
proto.BINPlayer.prototype.setReady = function(value) {
  jspb.Message.setField(this, 8, value);
};


proto.BINPlayer.prototype.clearReady = function() {
  jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.BINPlayer.prototype.hasReady = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * required bool exitAfterMatchEnd = 9;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.BINPlayer.prototype.getExitaftermatchend = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 9, false));
};


/** @param {boolean} value */
proto.BINPlayer.prototype.setExitaftermatchend = function(value) {
  jspb.Message.setField(this, 9, value);
};


proto.BINPlayer.prototype.clearExitaftermatchend = function() {
  jspb.Message.setField(this, 9, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.BINPlayer.prototype.hasExitaftermatchend = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * required int32 tableIndex = 10;
 * @return {number}
 */
proto.BINPlayer.prototype.getTableindex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/** @param {number} value */
proto.BINPlayer.prototype.setTableindex = function(value) {
  jspb.Message.setField(this, 10, value);
};


proto.BINPlayer.prototype.clearTableindex = function() {
  jspb.Message.setField(this, 10, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.BINPlayer.prototype.hasTableindex = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * repeated BINMapFieldEntry args = 11;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.BINMapFieldEntry>}
 */
proto.BINPlayer.prototype.getArgsList = function() {
  return /** @type{!Array.<!proto.BINMapFieldEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, map_field_entry_pb.BINMapFieldEntry, 11));
};


/** @param {!Array.<!proto.BINMapFieldEntry>} value */
proto.BINPlayer.prototype.setArgsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 11, value);
};


/**
 * @param {!proto.BINMapFieldEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.BINMapFieldEntry}
 */
proto.BINPlayer.prototype.addArgs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 11, opt_value, proto.BINMapFieldEntry, opt_index);
};


proto.BINPlayer.prototype.clearArgsList = function() {
  this.setArgsList([]);
};


goog.object.extend(exports, proto);