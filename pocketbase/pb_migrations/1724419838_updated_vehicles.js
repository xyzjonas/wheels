/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3f79fcvylau6gr9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sufxhyv7",
    "name": "setting_measurement",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "metric",
        "imperial"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3f79fcvylau6gr9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sufxhyv7",
    "name": "setting_mesurement",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "metric",
        "imperial"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
