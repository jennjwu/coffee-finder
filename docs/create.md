## Create Location
---

Create location by id

**URL**: /location

**Method**: POST

**Auth required**: no

**Permission required**: no

### Success response
---

Returns the id of the newly created location

**Code**: 201 Created

**Example**

```
{
    "id": 24
}
```

### Fail response
---

**Code**: 422 Unprocessable Entity

**Example**

```
{
    "error": "location data is invalid for creation"
}
```

