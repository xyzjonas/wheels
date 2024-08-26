/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3f79fcvylau6gr9",
    "created": "2024-08-19 08:24:29.321Z",
    "updated": "2024-08-19 08:24:29.321Z",
    "name": "vehicles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ykckvna6",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "twpt5q6a",
        "name": "registration",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3f79fcvylau6gr9");

  return dao.deleteCollection(collection);
})
