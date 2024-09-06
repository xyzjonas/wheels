/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("warfpb57ouugze1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "svozzzfi",
    "name": "date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("warfpb57ouugze1")

  // remove
  collection.schema.removeField("svozzzfi")

  return dao.saveCollection(collection)
})
