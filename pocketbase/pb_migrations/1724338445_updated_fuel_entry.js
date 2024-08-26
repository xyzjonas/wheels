/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4k2e6ban4l0cuf")

  collection.name = "fuel_entries"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4k2e6ban4l0cuf")

  collection.name = "fuel_entry"

  return dao.saveCollection(collection)
})
