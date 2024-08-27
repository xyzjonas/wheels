/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4k2e6ban4l0cuf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "02fro3uo",
    "name": "average",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4k2e6ban4l0cuf")

  // remove
  collection.schema.removeField("02fro3uo")

  return dao.saveCollection(collection)
})
