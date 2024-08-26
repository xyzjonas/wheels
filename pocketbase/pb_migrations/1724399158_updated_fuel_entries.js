/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4k2e6ban4l0cuf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yt7v1p0p",
    "name": "odometer",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4k2e6ban4l0cuf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yt7v1p0p",
    "name": "odometer",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
