/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3f79fcvylau6gr9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t1yyzzb5",
    "name": "setting_currency_position",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "before",
        "after"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3f79fcvylau6gr9")

  // remove
  collection.schema.removeField("t1yyzzb5")

  return dao.saveCollection(collection)
})
