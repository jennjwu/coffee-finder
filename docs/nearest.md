## Get Nearest Coffee Location

Get nearest location given input address

**URL**: /nearestCoffee?address="<address_str>"

**Method**: GET

**Auth required**: no

**Permission required**: no

----
## Success response

**Code**: 200 OK

**Example**

```
{
    "id": 16,
    "name": "Red Door Coffee",
    "address": "111 Minna St",
    "latitude": 37.78746242830388,
    "longitude": -122.39933341741562
}
```

----
## Fail response

**Code**: 500 Internal Server Error

**Example**

```
{
    "error": "error from google geocode: REQUEST_DENIED"
}
```

```
{
    "error": "google geocode api key not provided"
}
```

