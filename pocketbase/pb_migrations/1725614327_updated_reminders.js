/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uzkni6bhygneien")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q3ss542d",
    "name": "maintenance_entries",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "warfpb57ouugze1",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uzkni6bhygneien")

  // remove
  collection.schema.removeField("q3ss542d")

  return dao.saveCollection(collection)
})
