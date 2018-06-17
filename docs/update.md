## Update Location
Update location with new values by id

**URL**: /location/:id

**Method**: PATCH

**Body**: 
```
{
    "name": "Ritual Coffee Roasters v2",
    "address": "432B Octavia St APT 234341",
}
```

**Auth required**: no

**Permission required**: no

----
## Success response

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

----
## Fail responses

**Code**: 404 Not Found

**Example**

```
{
    "error": "location with id 240 not found"
}
```

Location id cannot be updated

**Code**: 422 Unprocessable Entity

**Example**

```
{
    "error": "updating location id is not allowable"
}
```
