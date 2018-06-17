## Get Location
---

Get location by id

**URL**: /location/:id

**Method**: GET

**Auth required**: no

**Permission required**: no

### Success response
---

**Code**: 200 OK

**Example**

```
{
    "id": 24,
    "name": "Ritual Coffee Roasters",
    "address": "432B Octavia St",
    "latitude": 37.77649268335422,
    "longitude": -122.4242315985391
}
```

### Fail response
---

**Code**: 404 Not Found

**Example**

```
{
    "error": "location with id 240 not found"
}
```

