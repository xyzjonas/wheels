/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3f79fcvylau6gr9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q0eyqixu",
    "name": "setting_color",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3f79fcvylau6gr9")

  // remove
  collection.schema.removeField("q0eyqixu")

  return dao.saveCollection(collection)
})
