/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3f79fcvylau6gr9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wnxmonx5",
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
  const collection = dao.findCollectionByNameOrId("3f79fcvylau6gr9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wnxmonx5",
    "name": "maintenance_entries",
    "type": "relation",
    "required": false,
    "presentable": true,
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
})
